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
  const [numTransactionsDeleted, setNumTransactionsDeleted] = useState<number>(0);
  const [uncategarisedIndex,setUncategarisedIndex] =useState<number[]>([]);
  const { toast } = useToast();
  const { supabase } = useSupabase();
  const [categoryIndex,setCategoryIndex] = useState<Number>(-1);

  const [transactionsToBeCategorized,setTransactionsToBeCategorized] = useState(0);

  async function fillCategoriesWithSuggestions() {
    const numRows = getNumRows(transactions) - 1 - numTransactionsDeleted;
    const indx = transactions[0].findIndex((x)=>x==="Category");
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
      if(ALL_CATEGORIES.includes(row[indx]))
      {
       categoriesSuggested[rowIndex] = row[indx];
      }
      else{
        setUncategarisedIndex((prevIndexes)=>[...prevIndexes,rowIndex]);
      }
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

  useEffect(()=>{
    setTransactionsToBeCategorized(uncategarisedIndex.length);
  },[uncategarisedIndex])


  function targetTransactionToDelete(index: number) {
    const copy = [...transactionsCopy];
    const categoriesCopy = [...categoriesSelected];
    copy.splice(index - 1, 1);
    categoriesCopy.splice(index - 1, 1);
    setTransactionsCopy(copy);
    setCategoriesSelected(categoriesCopy);
    setNumTransactionsDeleted(numTransactionsDeleted + 1);
    if (copy.length === 1) {
      toast({
        description:
          "ℹ️ You have deleted all transactions. If you want to upload transactions. If you want to continue uploading transactions, click on 'Restore transactions' button.",
      });
    }
  }

  function getNumTransactionsToBeCategorized() {
    return categoriesSelected.filter((item) => item === "").length;
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
    const numRows = getNumRows(transactions) - 1;
    setCategoriesSelected(new Array(numRows).fill(""));
    setNumTransactionsDeleted(0);
  }

  function getTableHeaders(): any {
    if (transactionsCopy.length === 0) return [];
    const firstRow = 0;
    return (
      <>
        {transactionsCopy[firstRow].map((col, colIndex) =>{
          if(categoryIndex ==-1 && col.toLowerCase() === 'category')
          {
            setCategoryIndex(colIndex);
          }
          return (
          <TableHead key={colIndex}>{col}</TableHead>
        )})}
        <TableHead className="p-2 w-2 pr-8" key={`options-header`}></TableHead>
      </>
    );
  }

  function handleSelectChange(value: string, colIndex: number) {
    const updatedCategories = [...categoriesSelected];
    updatedCategories[colIndex] = value;
    setCategoriesSelected(updatedCategories);
  }

  const handleClick = (event:any) => {
    const row:number = event.target.dataset.row;
    var uncatIndex:number = uncategarisedIndex.findIndex(x=>x===row-1);
    if(uncatIndex > -1)
    {
      setUncategarisedIndex((prevState)=>[...prevState.slice(0, uncatIndex),
        ...prevState.slice(uncatIndex + 1)]) 
    }
    setCategoriesSelected((prev)=>{ prev[row-1]=event.target.value; return [...prev];})
  };

  function getTableContents() {
    if (transactionsCopy.length === 0) return [];

    return transactionsCopy
      .map((row, rowIndex) => (
        <TableRow
          key={rowIndex}
          className={`${
            categoriesSelected[rowIndex - 1] !== "" ? "bg-gray-50" : ""
          } ${uncategarisedIndex.includes(rowIndex-1)?"bg-red-400 hover:bg-red-200":""}`}
        >

          {row.map((col, colIndex) =>{ 
            if(colIndex===categoryIndex){
              return(<TableCell key={colIndex}>{
                <select
                className="cursor-pointer p-0 "
                data-row={rowIndex}
                onChange={(e)=>{handleClick(e)}}
              >
                <option value="-1" disabled selected>
                  Select category
                </option>
                {ALL_CATEGORIES.map((item, index) => 
                { var selected;
                  if(col.toLowerCase() == item.toLowerCase()){
                    selected = true;
                  }
                  return(
                  <option value={item} key={index} selected={selected}>
                    {item}
                  </option>
                )})}
              </select>}</TableCell>)
            } 
            return(
            <TableCell key={colIndex}>{col}</TableCell>
          )})}
          <TableCell
            className="cursor-pointer p-0 "
            key={`${rowIndex}-options`}
            onClick={() => targetTransactionToDelete(rowIndex)}
          >
            <span className="p-0 w-4 h-4 hidden hoverable-cell">
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

    var CategoryColIndex = 0;
    transactionsCopy.forEach((row,rowIndex)=>{
      if(rowIndex==0)
      {
        CategoryColIndex = row.findIndex((x)=>x.toLowerCase()==="category");
      }
      else{
        row[CategoryColIndex] = categoriesSelected[rowIndex-1];
      }
    });
    setTransactions(transactionsCopy);
    nextStep();
  }

  const contents = getTableContents();
  const headers = getTableHeaders();
  
  return (
    <div className="w-full md:5/6 lg:w-4/6">
      <div>
        <Alert className="mb-2 text-2xl border-none px-0">
          <AlertTitle>Categorizing transactions</AlertTitle>
          <AlertDescription>
            Classify each transaction according to the category you consider
            most appropriate. It is completely personal.
          </AlertDescription>
        </Alert>
        <Alert className="mb-10 bg-emerald-50 w-1/2 mx-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="m10 19l-2.5-5.5L2 11l5.5-2.5L10 3l2.5 5.5L18 11l-5.5 2.5L10 19Zm8 2l-1.25-2.75L14 17l2.75-1.25L18 13l1.25 2.75L22 17l-2.75 1.25L18 21Z"
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
      <div className="flex flex-col items-center">
        <div className="flex gap-4">
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={cleanCategories}
              className="mb-5"
              disabled={!categoriesSelected.some((item) => item !== "")}
            >
              Clean categories
            </Button>
            <Button
              variant="outline"
              onClick={restoreTransactionsMatrix}
              className="mb-5"
              disabled={transactionsCopy.length === transactions.length}
            >
              Restore transactions
            </Button>
          </div>

          <Button
            onClick={handleNextStep}
            className="mb-5 bg-emerald-700 hover:bg-emerald-600"
            disabled={categoriesSelected.includes("")}
          >
            Next step
          </Button>
        </div>
        {transactionsToBeCategorized > 0 ? (
          <p className="flex justify-center mb-4 text-lg bg-blue-50 p-2 rounded-md">
            Transactions to be categorized:
            <span className="px-2 bg-blue-700 text-white ml-1 rounded-md">
              {transactionsToBeCategorized}
            </span>
          </p>
        ) : (
          <p className="flex justify-center mb-4 text-base md:text-lg bg-blue-50 p-2 rounded-md">
            All the transactions have been categorized 🎉
          </p>
        )}

        <TransactionsTable headers={headers} contents={contents} />
      </div>
    </div>
  );
}
