"use client";
import { TableCell, TableHead, TableRow } from "@/app/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { getNumColumns } from "@/lib/utils";
import { useContext, useEffect, useState } from "react";
import { ColHeader } from "@/app/types/global";
import { useToast } from "@/app/components/ui/use-toast";
import { addRowToMatrix } from "../../components/operators";
import { Button } from "@/app/components/ui/button";
import { TransactionsTable } from "../../components/transactions-table";
import { UploadTransactionsContext } from "../page";

const headerOptions = ["date", "concept", "amount"];

export function CategorizeColumns() {
  const { transactions, setTransactions, nextStep } = useContext(
    UploadTransactionsContext
  );

  const [transactionsCopy, setTransactionsCopy] = useState<string[][]>([]);
  const [colTitles, setColTitles] = useState<ColHeader[]>([]);

  const { toast } = useToast();

  useEffect(() => {
    setTransactionsCopy(transactions);
  }, [transactions]);

  function isHeaderChosen(headerName: string) {
    return colTitles.some((col) => col.name === headerName);
  }

  function handleSelectChange(headerName: string, column: number) {
    if (isHeaderChosen(headerName)) {
      toast({
        description: `⛔️ You have already assigned that '${headerName}' to another column.`,
      });
      return;
    }
    const columnIndex = colTitles.findIndex((col) => col.col === column);

    const updatedHeaders = [...colTitles];

    if (columnIndex === -1) {
      updatedHeaders.push({ name: headerName, col: column });
    } else {
      updatedHeaders[columnIndex] = { name: headerName, col: column };
    }

    setColTitles(updatedHeaders);
  }

  function createTableHeader(colIndex: number): JSX.Element {
    const value = colTitles.find((col) => col.col === colIndex)?.name || "";
    return (
      <TableHead key={colIndex}>
        <select
          onChange={(e) => handleSelectChange(e.target.value, colIndex)}
          value={value}
          className="w-[180px] p-2 border rounded"
        >
          <option value="" disabled selected>
            Select column
          </option>
          {headerOptions.map((item, index) => (
            <option value={item} key={index}>
              {item}
            </option>
          ))}
        </select>
      </TableHead>
    );
  }

  function getTableHeadersWithDropDown(): JSX.Element[] {
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

  function handleNext() {
    const sortedCols = colTitles.sort((a, b) => a.col - b.col);
    const headers = sortedCols.map((col) => col.name);
    const matrixWithCategories = addRowToMatrix(transactionsCopy, headers);
    setTransactions(matrixWithCategories);
    nextStep();
  }

  function restoreCategories() {
    toast({
      description: "🎉 Default categories restored",
    });
    setColTitles([]);
  }

  const contents = getTableContents();
  const headers = getTableHeadersWithDropDown();

  return (
    <>
      <div>
        <h1 className="text-xl pb-2">Step 3: Classify columns</h1>
        <p className="pb-10">
          Classify every column according to its respective category: date,
          concept, or amount.
        </p>
      </div>
      <Button
        variant="outline"
        onClick={restoreCategories}
        className="mb-5 bg-white-200"
        disabled={colTitles.length === 0}
      >
        Restore categories
      </Button>
      <Button
        variant="outline"
        onClick={handleNext}
        className="mb-5 bg-emerald-200"
      >
        Next step
      </Button>
      <TransactionsTable headers={headers} contents={contents} />
    </>
  );
}
