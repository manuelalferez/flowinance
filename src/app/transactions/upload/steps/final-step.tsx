import { Button } from "@/app/components/ui/button";
import { TableCell, TableHead, TableRow } from "@/app/components/ui/table";
import { useToast } from "@/app/components/ui/use-toast";
import { useSupabase } from "@/app/supabase-provider";
import { TransactionSupabase } from "@/app/types/global";
import { UploadTransactionsContext } from "@/lib/context";
import { getUserId, uploadTransactionsToSupabase } from "@/lib/utils";
import { useContext, useEffect, useState } from "react";
import { TransactionsTable } from "../../components/transactions-table";

export function FinalStep() {
  const [transactionsCopy, setTransactionsCopy] = useState<string[][]>([]);
  const { transactions } = useContext(UploadTransactionsContext);
  const { toast } = useToast();
  const { supabase } = useSupabase();

  useEffect(() => {
    setTransactionsCopy(transactions);
  }, [transactions]);

  function getTableHeaders(): any {
    if (transactionsCopy.length === 0) return [];
    const firstRow = 0;
    return (
      <>
        {transactionsCopy[firstRow].map((col, colIndex) => (
          <TableHead key={colIndex}>{col}</TableHead>
        ))}
      </>
    );
  }
  function getTableContents() {
    if (transactionsCopy.length === 0) return [];
    return transactionsCopy
      .map((row, rowIndex) => (
        <TableRow key={rowIndex}>
          {row.map((col, colIndex) => (
            <TableCell key={colIndex}>{col}</TableCell>
          ))}
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
      const transaction = {
        date: transactionsCopy[i][0],
        concept: transactionsCopy[i][1],
        amount: parseFloat(transactionsCopy[i][2]),
        category: transactionsCopy[i][3],
        user_id: userId,
      };
      transactionsToInsert.push(transaction);
    }

    uploadTransactionsToSupabase(supabase, transactionsToInsert);

    toast({
      description: "🎉 Transactions uploaded successfully",
    });
  }

  const contents = getTableContents();
  const headers = getTableHeaders();
  return (
    <div>
      <div>
        <h1 className="text-xl pb-2">Step 6: Final step</h1>
        <p className="pb-10">Check everything is right before uploading. </p>
        <div className="flex justify-center mb-10">
          <Button onClick={uploadTransactions}>Upload transactions</Button>
        </div>
      </div>
      <TransactionsTable headers={headers} contents={contents} />
    </div>
  );
}