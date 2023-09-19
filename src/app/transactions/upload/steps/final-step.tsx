import { Button } from "@/app/components/ui/button";
import { TableCell, TableHead, TableRow } from "@/app/components/ui/table";
import { useToast } from "@/app/components/ui/use-toast";
import { useSupabase } from "@/app/supabase-provider";
import { TransactionSupabase } from "@/app/types/global";
import { UploadTransactionsContext } from "@/lib/context";
import {
  encryptData,
  formatDateStringToDdMmYyyy,
  getUserId,
  headersOrderIndexs,
  roundToTwoDecimal,
  uploadTransactionsToSupabase,
} from "@/lib/utils";
import { useContext, useEffect, useState } from "react";
import { TransactionsTable } from "../../components/transactions-table";
import { ALL_CATEGORIES } from "@/lib/categories";

export function FinalStep() {
  const [transactionsCopy, setTransactionsCopy] = useState<string[][]>([]);
  const { transactions } = useContext(UploadTransactionsContext);
  const { toast } = useToast();
  const { supabase } = useSupabase();
  function getTransactionsWithDateFormated() {
    const copy = transactions.map((row) => [...row]);
    for (let i = 1; i < copy.length; i++) {
      const dateStr = copy[i][0];
      const formattedDate = formatDateStringToDdMmYyyy(dateStr);
      copy[i][0] = formattedDate;
    }
    return copy;
  }
  useEffect(() => {
    const transactionsWithDateFormated = getTransactionsWithDateFormated();
    setTransactionsCopy(transactionsWithDateFormated);
  }, [transactions]);

  function getTableHeaders(): any {
    if (transactionsCopy.length === 0) return [];
    const firstRow = 0;
    return (
      <>
        {transactionsCopy[firstRow].map((col, colIndex) => (
          <TableHead key={colIndex}>{col}</TableHead>
        ))}
        <TableHead className="p-2 w-2 pr-8" key={`options-header`}></TableHead>
      </>
    );
  }

  function handleSelectChange(value: string, rowIndex: number) {
    const editedCategory = [...transactionsCopy];
    editedCategory[rowIndex][headersOrderIndexs.category] = value;
    setTransactionsCopy(editedCategory);
  }

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

  function getTableContents() {
    if (transactionsCopy.length === 0) return [];

    return transactionsCopy
      .map((row, rowIndex) => (
        <TableRow key={rowIndex}>
          {row.map((col, colIndex) => (
            <TableCell key={colIndex}>
              {colIndex === headersOrderIndexs.category ? (
                <select
                  onChange={(e) => handleSelectChange(e.target.value, rowIndex)}
                  value={col}
                  className="w-auto p-2 border rounded"
                >
                  <option value="" disabled>
                    Select category
                  </option>
                  {ALL_CATEGORIES.map((item, index) => (
                    <option value={item} key={index}>
                      {item}
                    </option>
                  ))}
                </select>
              ) : (
                col
              )}
            </TableCell>
          ))}
          <TableCell
            className="cursor-pointer hidden hoverable-cell"
            key={`${rowIndex}-options`}
          >
            <span
              className="p-0 pt-4 w-4 h-4 flex justify-center items-center"
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

  async function uploadTransactions() {
    const userId = await getUserId(supabase);
    const transactionsToInsert: TransactionSupabase[] = [];

    if (!userId) {
      toast({
        description: "Error uploading transactions, try again later",
      });
      return;
    }

    for (let i = 1; i < transactionsCopy.length; i++) {
      if (isNaN(parseFloat(transactionsCopy[i][headersOrderIndexs.amount]))) {
        toast({
          description:
            "❎ Error uploading transactions. Please, check the 'amount' column. It should be a number.",
        });
        return;
      }
      const amountWithTwoDecimals = roundToTwoDecimal(
        parseFloat(transactionsCopy[i][2])
      );

      const transaction = {
        date: encryptData(transactionsCopy[i][0], userId),
        concept: encryptData(transactionsCopy[i][1], userId),
        amount: encryptData(Math.abs(amountWithTwoDecimals), userId),
        category: encryptData(transactionsCopy[i][3], userId),
        user_id: userId,
      };
      transactionsToInsert.push(transaction);
    }

    uploadTransactionsToSupabase(supabase, transactionsToInsert);

    toast({
      description: "🎉 Transactions uploaded successfully",
    });
    window.location.href = "/transactions";
  }

  function restoreTransactionsMatrix() {
    setTransactionsCopy(transactions);
  }

  const contents = getTableContents();
  const headers = getTableHeaders();
  return (
    <div>
      <div>
        <h1 className="text-xl pb-2">Step 6: Final step</h1>
        <p className="pb-10">Check everything is right before uploading. </p>
        <div className="flex justify-center mb-10 gap-2">
          <Button
            variant="outline"
            onClick={restoreTransactionsMatrix}
            className="mb-5 bg-emerald-200"
            disabled={transactionsCopy.length === transactions.length}
          >
            Restore transactions
          </Button>
          <Button
            onClick={uploadTransactions}
            disabled={transactionsCopy.length === 1}
          >
            Upload transactions
          </Button>
        </div>
      </div>
      <TransactionsTable headers={headers} contents={contents} />
    </div>
  );
}
