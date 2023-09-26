import { Button } from "@/app/components/ui/button";
import { TableCell, TableHead, TableRow } from "@/app/components/ui/table";
import { useToast } from "@/app/components/ui/use-toast";
import { useSupabase } from "@/app/supabase-provider";
import { TransactionSupabase } from "@/app/types/global";
import { UploadTransactionsContext } from "@/lib/context";
import {
  encryptData,
  formatDateStringToDdMmYyyy,
  getNewTransactions,
  getUserId,
  headersOrderIndexs,
  roundToTwoDecimal,
  uploadTransactionsToSupabase,
} from "@/lib/utils";
import { useContext, useEffect, useState } from "react";
import { TransactionsTable } from "../../components/transactions-table";
import { ALL_CATEGORIES } from "@/lib/categories";
import { Alert, AlertDescription, AlertTitle } from "@/app/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import Loading from "@/app/loading";

export function FinalStep() {
  const [transactionsCopy, setTransactionsCopy] = useState<string[][]>([]);
  const { transactions } = useContext(UploadTransactionsContext);
  const [uploading, setUploading] = useState<boolean>(false);
  const [isDuplicatedTransactions, setIsDuplicatedTransactions] =
    useState<boolean>(false);
  const [nonDuplicatedTransactions, setNonDuplicatedTransactions] = useState<
    string[][]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
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
    const getTransactions = async () => {
      const newTransactions = await getNewTransactions(supabase, transactions);
      setNonDuplicatedTransactions(newTransactions);
      setIsDuplicatedTransactions(
        newTransactions.length !== transactions.length
      );
    };
    getTransactions();
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
    setUploading(true);
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

    await uploadTransactionsToSupabase(supabase, transactionsToInsert);
    setUploading(false);
    window.location.href = "/transactions";
  }

  function restoreTransactionsMatrix() {
    setTransactionsCopy(transactions);
  }

  const contents = getTableContents();
  const headers = getTableHeaders();

  function isAllDuplicateTransactions() {
    return nonDuplicatedTransactions.length === 1;
  }

  function handleYes() {
    if (isAllDuplicateTransactions()) {
      setLoading(true);
      window.location.href = "/transactions";
    }
    setTransactionsCopy(nonDuplicatedTransactions);
    setIsDuplicatedTransactions(false);
    setLoading(false);
  }

  function handleNo() {
    setIsDuplicatedTransactions(false);
  }
  return loading ? (
    <Loading />
  ) : (
    <Dialog open={isDuplicatedTransactions}>
      <div className="w-full md:5/6 lg:w-4/6">
        <div>
          <Alert className="mb-10 text-2xl border-none px-0">
            <AlertTitle>Upload the transactions</AlertTitle>
            <AlertDescription>
              Check everything is right before uploading.
            </AlertDescription>
          </Alert>
          <div className="flex flex-col items-center">
            <div className="flex justify-center  gap-2">
              <Button
                variant="outline"
                onClick={restoreTransactionsMatrix}
                className="mb-5"
                disabled={transactionsCopy.length === transactions.length}
              >
                Restore transactions
              </Button>
              <Button
                onClick={uploadTransactions}
                disabled={transactionsCopy.length === 1}
                className="bg-emerald-700 hover:bg-emerald-600"
              >
                {uploading && (
                  <svg
                    aria-hidden="true"
                    className="inline w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-emerald-400"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                )}
                Upload transactions
              </Button>
            </div>
            <TransactionsTable headers={headers} contents={contents} />
          </div>
        </div>
      </div>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isAllDuplicateTransactions()
              ? "All the transactions already exist in your account."
              : `There is ${
                  transactions.length - nonDuplicatedTransactions.length
                } repeated transactions`}
          </DialogTitle>
          <DialogDescription>
            Do you want to skip uploading all the transactions since they
            already exist in your account? We recommend doing so.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-center">
          <Button variant={"default"} onClick={handleYes}>
            Yes
          </Button>
          <Button variant={"outline"} onClick={handleNo}>
            No
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
