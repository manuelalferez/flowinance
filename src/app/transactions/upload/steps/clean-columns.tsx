"use client";
import { TableCell, TableHead, TableRow } from "@/app/components/ui/table";
import { getNumColumns } from "@/lib/utils";
import { useContext, useEffect, useState } from "react";
import { useToast } from "@/app/components/ui/use-toast";
import { removeColumn } from "../../components/operators";
import { Button } from "@/app/components/ui/button";
import { TransactionsTable } from "../../components/transactions-table";
import { UploadTransactionsContext } from "@/lib/context";
import { Alert, AlertDescription, AlertTitle } from "@/app/components/ui/alert";

export function CleanColumns() {
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

  function deleteColumn(col: number) {
    if (hasDeletedMaxColumns()) {
      toast({
        description: "⛔️ You cannot delete more than 3 columns",
      });
      return;
    }
    const filteredColumn = removeColumn(transactionsCopy, col);
    setTransactionsCopy(filteredColumn);
  }

  function hasDeletedMaxColumns() {
    if (transactionsCopy.length === 0) return false;
    const MAX_COLUMNS = 3;
    return transactionsCopy[0].length <= MAX_COLUMNS;
  }

  function createTableHeader(colIndex: number): JSX.Element {
    return (
      <TableHead key={colIndex}>
        <Button onClick={() => deleteColumn(colIndex)}>Delete</Button>
      </TableHead>
    );
  }

  function getTableHeadersWithButtons(): JSX.Element[] {
    const numCols = getNumColumns(transactionsCopy);
    const tableHeaders = [];

    for (let i = 0; i < numCols; i++) {
      const tableHeader = createTableHeader(i);
      tableHeaders.push(tableHeader);
    }

    return tableHeaders;
  }

  function getTableContents() {
    return transactionsCopy.map((row, rowIndex) => (
      <TableRow key={rowIndex}>
        {row.map((col, colIndex) => (
          <TableCell key={colIndex}>{col}</TableCell>
        ))}
      </TableRow>
    ));
  }

  function handleNextStep() {
    setTransactions(transactionsCopy);
    nextStep();
  }

  const contents = getTableContents();
  const headers = getTableHeadersWithButtons();

  return (
    <>
      <div>
        <Alert className="mb-10 text-2xl border-none">
          <AlertTitle>Cleaning columns</AlertTitle>
          <AlertDescription>
            Keep only three columns: one for <b>date</b>, one for <b>concept</b>
            , and one for the <b>amount</b>. You can delete all the others.
          </AlertDescription>
        </Alert>
      </div>
      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={restoreTransactionsMatrix}
          className="mb-5 bg-emerald-200"
          disabled={transactionsCopy === transactions}
        >
          Restore columns
        </Button>
        <Button
          variant="outline"
          onClick={handleNextStep}
          className="mb-5 bg-emerald-200"
          disabled={!hasDeletedMaxColumns()}
        >
          Next step
        </Button>
      </div>

      <TransactionsTable headers={headers} contents={contents} />
    </>
  );
}
