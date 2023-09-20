"use client";
import { TableCell, TableHead, TableRow } from "@/app/components/ui/table";
import { useContext, useEffect, useState } from "react";
import { useToast } from "@/app/components/ui/use-toast";
import { removeRow } from "../../components/operators";
import { Button } from "@/app/components/ui/button";
import { TransactionsTable } from "../../components/transactions-table";
import { UploadTransactionsContext } from "@/lib/context";
import {
  calculatePercentageWithCondition,
  headersOrderIndexs,
  isNumberCondition,
  isValidDate,
} from "@/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "@/app/components/ui/alert";

export function CleanRows() {
  const { transactions, setTransactions, nextStep } = useContext(
    UploadTransactionsContext
  );
  const [transactionsCopy, setTransactionsCopy] = useState<string[][]>([]);

  const { toast } = useToast();

  useEffect(() => {
    setTransactionsCopy(transactions);
  }, [transactions]);

  function restoreTransactionsMatrix(isError?: boolean) {
    if (isError) {
      setTransactionsCopy(transactions);
      return;
    }
    toast({
      description: "✅ Transactions restored.",
    });
    setTransactionsCopy(transactions);
  }

  function getTableHeaders(): any {
    if (transactionsCopy.length === 0) return [];
    const firstRow = 0;
    return (
      <>
        <TableHead key="extra-header"></TableHead>
        {transactionsCopy[firstRow].map((col, colIndex) => (
          <TableHead key={colIndex}>{col}</TableHead>
        ))}
      </>
    );
  }

  function hasDeletedMaxRows() {
    if (transactionsCopy.length === 0) return false;
    const MAX_ROWS = 1;
    return transactionsCopy.length <= MAX_ROWS;
  }

  function deleteRow(rowIndex: number) {
    const LAST_ROW = 2;
    if (transactionsCopy.length === LAST_ROW) {
      toast({
        description:
          "ℹ️ All rows have been deleted. You can either restore the rows or navigate back.",
      });
    }
    const matrixWithoutRow = removeRow(transactionsCopy, rowIndex);
    setTransactionsCopy(matrixWithoutRow);
  }

  function getTableContents() {
    if (transactionsCopy.length === 0) return [];
    return transactionsCopy
      .map((row, rowIndex) => (
        <TableRow key={rowIndex}>
          <TableCell key={rowIndex}>
            <Button onClick={() => deleteRow(rowIndex)}>Delete</Button>
          </TableCell>
          {row.map((col, colIndex) => (
            <TableCell key={colIndex}>{col}</TableCell>
          ))}
        </TableRow>
      ))
      .slice(1);
  }

  function handleNextStep() {
    if (
      calculatePercentageWithCondition(
        transactionsCopy.slice(1),
        headersOrderIndexs.amount,
        isNumberCondition
      ) !== 100
    ) {
      toast({
        description:
          "❎ The column 'amount' should contain numbers. Please, delete those rows that are not numbers.",
      });
      restoreTransactionsMatrix(true);
      return;
    }
    if (
      calculatePercentageWithCondition(
        transactionsCopy.slice(1),
        headersOrderIndexs.date,
        isValidDate
      ) !== 100
    ) {
      toast({
        description:
          "❎ The column 'date' should contain dates. Please, delete those rows that are not dates.",
      });
      restoreTransactionsMatrix(true);
      return;
    }
    setTransactions(transactionsCopy);
    nextStep();
  }

  const contents = getTableContents();
  const headers = getTableHeaders();

  return (
    <>
      <div>
        <Alert className="mb-10 text-2xl border-none">
          <AlertTitle>Cleaning transactions</AlertTitle>
          <AlertDescription>
            Remove those rows that you don&apos;t want or that aren&apos;t valid
            transactions. For a transaction to be considered valid, every date
            must be a date, and every amount must be a number.
          </AlertDescription>
        </Alert>
      </div>
      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={() => restoreTransactionsMatrix(false)}
          className="mb-5 bg-emerald-200"
          disabled={transactionsCopy === transactions}
        >
          Restore rows
        </Button>
        <Button
          variant="outline"
          onClick={handleNextStep}
          className="mb-5 bg-emerald-200"
          disabled={hasDeletedMaxRows()}
        >
          Next step
        </Button>
      </div>

      <TransactionsTable headers={headers} contents={contents} />
    </>
  );
}
