"use client";
import { TableCell, TableHead, TableRow } from "@/app/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { getNumColumns, TransactionsMatrix } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { SelectedCol } from "./types";
import { removeUnselectedColumns } from "./operators";
import { TransactionsTable } from "./transactions-table";
import { useToast } from "../ui/use-toast";

const headerOptions = ["date", "concept", "amount"];

interface TransactionsProps {
  matrix: TransactionsMatrix;
}

export function Transactions({ matrix }: TransactionsProps) {
  const [transactionsMatrix, setTransactionsMatrix] =
    useState<TransactionsMatrix>({ transactions: [] });
  const [selectedCols, setSelectedCols] = useState<SelectedCol[]>([]);
  const [erased, setErased] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setTransactionsMatrix(matrix);
  }, [matrix]);

  function handleSelectChange(content: string, column: number) {
    const columnIndex = selectedCols.findIndex((col) => col.col === column);

    if (columnIndex === -1) {
      setSelectedCols([...selectedCols, { content: content, col: column }]);
    } else {
      setSelectedCols(selectedCols.filter((col) => col.col !== column));
    }
  }

  function createTableHeader(columnIndex: number): JSX.Element {
    return (
      <TableHead key={columnIndex}>
        <Select
          onValueChange={(content) => handleSelectChange(content, columnIndex)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select column" />
          </SelectTrigger>
          <SelectContent>
            {headerOptions.map((item, index) => (
              <SelectItem value={item} key={index}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </TableHead>
    );
  }

  function getTableHeadersWithDropDown(): JSX.Element[] {
    const numCols = getNumColumns(transactionsMatrix);
    const tableHeaders = [];

    for (let i = 0; i < numCols; i++) {
      const tableHeader = createTableHeader(i);
      tableHeaders.push(tableHeader);
    }

    return tableHeaders;
  }

  function handleDeleteUnselectedCols() {
    if (selectedCols.length < 3) {
      toast({
        description: "⛔️ You have to select at least 3 columns",
      });
      return;
    }
    if (erased) {
      toast({
        description: "ℹ️ You've already removed the unnecessary columns.",
      });
      return;
    }
    setTransactionsMatrix(
      removeUnselectedColumns(selectedCols, transactionsMatrix)
    );
    const sortedCols = selectedCols.sort((a, b) => a.col - b.col);
    setSelectedCols([
      { col: 0, content: sortedCols[0].content },
      { col: 1, content: sortedCols[1].content },
      { col: 2, content: sortedCols[2].content },
    ]);
    setErased(true);
    toast({
      description: "🎉 Unnecessary columns successfully deleted!",
    });
  }

  function selectedTableHeaders() {
    return selectedCols.map((item, index) => (
      <TableHead key={index}>{item.content}</TableHead>
    ));
  }

  function getTableContents() {
    return transactionsMatrix.transactions.map((row, rowIndex) => (
      <TableRow key={rowIndex}>
        {row.map((col, colIndex) => (
          <TableCell key={colIndex}>{col}</TableCell>
        ))}
      </TableRow>
    ));
  }

  const headers = erased
    ? selectedTableHeaders()
    : getTableHeadersWithDropDown();
  const contents = getTableContents();

  return (
    <>
      <Button
        variant="outline"
        onClick={handleDeleteUnselectedCols}
        className="mb-5 bg-emerald-200"
      >
        Delete unselected columns
      </Button>
      <TransactionsTable headers={headers} contents={contents} />
    </>
  );
}
