"use client";
import { TableCell, TableHead, TableRow } from "@/app/components/ui/table";
import { useEffect, useState } from "react";
import { useToast } from "@/app/components/ui/use-toast";
import { removeColumn } from "../../components/operators";
import { Button } from "@/app/components/ui/button";
import { TransactionsTable } from "../../components/transactions-table";

interface TransactionsProps {
  transactions: string[][];
  updateTransactions: (transactions: string[][]) => void;
  nextStep: () => void;
}

export function CleanRows({
  transactions,
  updateTransactions,
  nextStep,
}: TransactionsProps) {
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

  function getTableHeaders(): any {
    if (transactionsCopy.length === 0) return [];
    const firstRow = 0;
    return (
      <TableRow key={firstRow}>
        {transactionsCopy[firstRow].map((col, colIndex) => (
          <TableHead key={colIndex}>{col}</TableHead>
        ))}
      </TableRow>
    );
  }

  function getTableContents() {
    if (transactionsCopy.length === 0) return [];
    return transactionsCopy.map((row, rowIndex) => (
      <TableRow key={rowIndex}>
        {row.map((col, colIndex) => (
          <TableCell key={colIndex}>{col}</TableCell>
        ))}
      </TableRow>
    ));
  }

  function handleNextStep() {
    updateTransactions(transactionsCopy);
    nextStep();
  }

  const contents = getTableContents();
  const headers = getTableHeaders();

  return (
    <>
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
