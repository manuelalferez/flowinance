"use client";
import { TableCell, TableHead, TableRow } from "@/app/components/ui/table";
import { useContext, useEffect, useState } from "react";
import { useToast } from "@/app/components/ui/use-toast";
import { removeRow } from "../../components/operators";
import { Button } from "@/app/components/ui/button";
import { TransactionsTable } from "../../components/transactions-table";
import { UploadTransactionsContext } from "@/lib/context";

export function CleanRows() {
  const { transactions, setTransactions, nextStep } = useContext(
    UploadTransactionsContext
  );
  const [transactionsCopy, setTransactionsCopy] = useState<string[][]>([]);

  const { toast } = useToast();

  useEffect(() => {
    setTransactionsCopy(transactions);
  }, [transactions]);

  function restoreTransactionsMatrix() {
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
    setTransactions(transactionsCopy);
    nextStep();
  }

  const contents = getTableContents();
  const headers = getTableHeaders();

  return (
    <>
      <div>
        <h1 className="text-xl pb-2">Step 4: Cleaning rows</h1>
        <p className="pb-10">Exclude any unwanted rows</p>
      </div>
      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={restoreTransactionsMatrix}
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
