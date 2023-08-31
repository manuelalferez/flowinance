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

export function CategorizeTransactions() {
  const { transactions, setTransactions, nextStep } = useContext(
    UploadTransactionsContext
  );
  const [transactionsCopy, setTransactionsCopy] = useState<string[][]>([]);
  const [colHeaders, setColHeaders] = useState<ColHeader[]>([]);

  const { toast } = useToast();

  useEffect(() => {
    setTransactionsCopy(transactions);
  }, [transactions]);

  function handleSelectChange(headerName: string, column: number) {
    const columnIndex = colHeaders.findIndex((col) => col.col === column);

    if (columnIndex === -1) {
      setColHeaders([...colHeaders, { name: headerName, col: column }]);
    } else {
      setColHeaders(colHeaders.filter((col) => col.col !== column));
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
    const sortedCols = colHeaders.sort((a, b) => a.col - b.col);
    const headers = sortedCols.map((col) => col.name);
    const matrixWithCategories = addRowToMatrix(transactionsCopy, headers);
    setTransactions(matrixWithCategories);
    nextStep();
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
        onClick={handleNext}
        className="mb-5 bg-emerald-200"
      >
        Next step
      </Button>
      <TransactionsTable headers={headers} contents={contents} />
    </>
  );
}
