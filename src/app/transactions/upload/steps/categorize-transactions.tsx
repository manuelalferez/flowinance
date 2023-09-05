"use client";
import { TableCell, TableHead, TableRow } from "@/app/components/ui/table";
import { useContext, useEffect, useState } from "react";
import { useToast } from "@/app/components/ui/use-toast";
import { Button } from "@/app/components/ui/button";
import { TransactionsTable } from "../../components/transactions-table";
import { UploadTransactionsContext } from "../page";
import { ALL_CATEGORIES } from "@/lib/categories";
import { getNumRows } from "@/lib/utils";
import { addColumnToMatrix } from "../../components/operators";

export function CategorizeTransactions() {
  const { transactions, setTransactions, nextStep } = useContext(
    UploadTransactionsContext
  );
  const [transactionsCopy, setTransactionsCopy] = useState<string[][]>([]);
  const [categoriesSelected, setCategoriesSelected] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    setTransactionsCopy(transactions);
    const numRows = getNumRows(transactions) - 1;
    setCategoriesSelected(new Array(numRows).fill(""));
  }, [transactions]);

  function cleanCategories() {
    toast({
      description: "🎉 All categories cleaned",
    });
    const numRows = getNumRows(transactionsCopy) - 1;
    setCategoriesSelected(new Array(numRows).fill(""));
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

  function handleSelectChange(value: string, colIndex: number) {
    const updatedCategories = [...categoriesSelected];
    updatedCategories[colIndex] = value;
    setCategoriesSelected(updatedCategories);
  }

  function getTableContents() {
    if (transactionsCopy.length === 0) return [];
    return transactionsCopy
      .map((row, rowIndex) => (
        <TableRow key={rowIndex}>
          <TableCell key={rowIndex}>
            <select
              onChange={(e) => handleSelectChange(e.target.value, rowIndex - 1)}
              value={categoriesSelected[rowIndex - 1]}
              className="w-[180px] p-2 border rounded"
            >
              <option value="" disabled selected>
                Select category
              </option>
              {ALL_CATEGORIES.map((item, index) => (
                <option value={item} key={index}>
                  {item}
                </option>
              ))}
            </select>
          </TableCell>
          {row.map((col, colIndex) => (
            <TableCell key={colIndex}>{col}</TableCell>
          ))}
        </TableRow>
      ))
      .slice(1);
  }

  function handleNextStep() {
    const colWithCategories = ["category", ...categoriesSelected];
    const transactionsCategorized = addColumnToMatrix(
      transactionsCopy,
      colWithCategories
    );
    setTransactions(transactionsCategorized);
    nextStep();
  }

  const contents = getTableContents();
  const headers = getTableHeaders();

  return (
    <>
      <div>
        <h1 className="text-xl pb-2">Step 5: Categorizing transactions</h1>
        <p className="pb-10">
          Classify each transaction according to the category you consider most
          appropriate. It is completely personal.
        </p>
      </div>
      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={cleanCategories}
          className="mb-5 bg-emerald-200"
          disabled={!categoriesSelected.some((item) => item !== "")}
        >
          Clean categories
        </Button>
        <Button
          variant="outline"
          onClick={handleNextStep}
          className="mb-5 bg-emerald-200"
          disabled={categoriesSelected.includes("")}
        >
          Next step
        </Button>
      </div>

      <TransactionsTable headers={headers} contents={contents} />
    </>
  );
}
