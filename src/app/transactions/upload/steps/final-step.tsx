import { Button } from "@/app/components/ui/button";
import { TableCell, TableHead, TableRow } from "@/app/components/ui/table";
import { useToast } from "@/app/components/ui/use-toast";
import { UploadTransactionsContext } from "@/lib/context";
import { useContext, useEffect, useState } from "react";
import { TransactionsTable } from "../../components/transactions-table";

export function FinalStep() {
  const [transactionsCopy, setTransactionsCopy] = useState<string[][]>([]);
  const { transactions } = useContext(UploadTransactionsContext);
  const { toast } = useToast();

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
  function uploadTransactions() {
    toast({
      description: "🚀 Uploading transactions...",
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
