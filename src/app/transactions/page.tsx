"use client";

import { useState } from "react";
import { DragAndDrop } from "./components/drag-and-drop";
import { Toaster } from "../components/ui/toaster";
import { TransactionsMatrix } from "../types/global";
import { TransactionsViewer } from "./components";

export default function Page() {
  const [transactions, setTransactions] = useState<TransactionsMatrix>({
    transactions: [],
  });
  function handleTransactions(matrix: TransactionsMatrix) {
    setTransactions(matrix);
  }
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-xl pb-10">Finance graph</h1>
      <DragAndDrop handleTransactions={handleTransactions} />
      <h1 className="text-xl pt-10 pb-5">Transactions:</h1>
      <TransactionsViewer transactions={transactions} />
      <Toaster />
    </main>
  );
}
