"use client";
import { TableCell, TableHead, TableRow } from "@/app/components/ui/table";
import { useContext, useEffect, useState } from "react";
import { useToast } from "@/app/components/ui/use-toast";
import { Button } from "@/app/components/ui/button";
import { TransactionsTable } from "../../components/transactions-table";
import { ALL_CATEGORIES } from "@/lib/categories";
import {
  decryptTransactions,
  getNumRows,
  getTransactions,
  getUserId,
  headersOrderIndexs,
} from "@/lib/utils";
import { addColumnToMatrix } from "../../components/operators";
import { UploadTransactionsContext } from "@/lib/context";
import { useSupabase } from "@/app/supabase-provider";
import { Alert, AlertDescription, AlertTitle } from "@/app/components/ui/alert";

export function CategorizeTransactions() {
  const { transactions, setTransactions, nextStep } = useContext(
    UploadTransactionsContext
  );
  const [transactionsCopy, setTransactionsCopy] = useState<string[][]>([]);
  const [categoriesSelected, setCategoriesSelected] = useState<string[]>([]);
  const { toast } = useToast();
  const { supabase } = useSupabase();

  async function fillCategoriesWithSuggestions() {
    const numRows = getNumRows(transactions) - 1;
    const categoriesSuggested = new Array(numRows).fill("");
    const data = await getTransactions(supabase);
    const userId = await getUserId(supabase);
    if (!userId) return categoriesSuggested;
    if (!data) return categoriesSuggested;
    const transactionsHistory = decryptTransactions(data, userId);

    if (!transactionsHistory) return categoriesSuggested;
    transactions.slice(1).forEach((row, rowIndex) => {
      const concept = row[headersOrderIndexs.concept];
      const categoryObj = transactionsHistory.findLast((row) =>
        row.concept.includes(concept)
      );
      const category = categoryObj ? categoryObj.category : null;

      if (category) categoriesSuggested[rowIndex] = category;
    });
    return categoriesSuggested;
  }

  useEffect(() => {
    setTransactionsCopy(transactions);
    const getCategorySuggestions = async () => {
      const suggestedCategories = await fillCategoriesWithSuggestions();
      setCategoriesSelected(suggestedCategories);
    };
    getCategorySuggestions();
  }, [transactions]);

  function targetTransactionToDelete(index: number) {
    const copy = [...transactionsCopy];
    copy.splice(index, 1);
    setTransactionsCopy(copy);
    if (copy.length === 1) {
      toast({
        description:
          "ℹ️ You have deleted all transactions. If you want to upload transactions. If you want to continue uploading transactions, click on 'Restore transactions' button.",
      });
    }
  }

  function cleanCategories() {
    toast({
      description: "🎉 All categories cleaned",
    });
    const numRows = getNumRows(transactionsCopy) - 1;
    setCategoriesSelected(new Array(numRows).fill(""));
  }

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
        <TableHead className="p-2 w-2 pr-8" key={`options-header`}></TableHead>
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
        <TableRow
          key={rowIndex}
          className={`${
            categoriesSelected[rowIndex - 1] !== "" ? "bg-gray-50" : ""
          }`}
        >
          <TableCell key={rowIndex}>
            <select
              onChange={(e) => handleSelectChange(e.target.value, rowIndex - 1)}
              value={categoriesSelected[rowIndex - 1]}
              className="w-auto p-2 border rounded"
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
          <TableCell
            className="cursor-pointer p-0 "
            key={`${rowIndex}-options`}
          >
            <span
              className="p-0 w-4 h-4 hidden hoverable-cell"
              onClick={() => targetTransactionToDelete(rowIndex)}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4L3.5 4C3.22386 4 3 3.77614 3 3.5ZM5 4H10V12H5V4Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            </span>
          </TableCell>
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
        <p className="pb-2">
          Classify each transaction according to the category you consider most
          appropriate. It is completely personal.
        </p>
        <Alert className="mb-10 bg-emerald-50">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 15 15"
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M7.5.877a6.623 6.623 0 1 0 0 13.246A6.623 6.623 0 0 0 7.5.877ZM1.827 7.5a5.673 5.673 0 1 1 11.346 0a5.673 5.673 0 0 1-11.346 0Zm6.423-3a.75.75 0 1 1-1.5 0a.75.75 0 0 1 1.5 0ZM6 6h1.5a.5.5 0 0 1 .5.5V10h1v1H6v-1h1V7H6V6Z"
              clipRule="evenodd"
            />
          </svg>
          <AlertTitle>Note</AlertTitle>
          <AlertDescription>
            If you&apos;ve uploaded transactions before, your assigned
            categories will load automatically. When you select a category, the
            row will turn gray, indicating that the category has been assigned.
          </AlertDescription>
        </Alert>
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
          onClick={restoreTransactionsMatrix}
          className="mb-5 bg-emerald-200"
          disabled={transactionsCopy.length === transactions.length}
        >
          Restore transactions
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

      <div>
        <TransactionsTable headers={headers} contents={contents} />
      </div>
    </>
  );
}
