"use client";

import { TransactionsMatrix } from "@/lib/utils";
import { useState } from "react";
import { DragAndDrop } from "./components/drag-and-drop";
import { Transactions } from "./components/transactions";
import { Toaster } from "./components/ui/toaster";

export default function Home() {
  const [matrix, setMatrix] = useState<TransactionsMatrix>({
    transactions: [],
  });
  function handleTransactions(matrix: TransactionsMatrix) {
    setMatrix(matrix);
  }
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-xl pb-10">Finance graph</h1>
      <DragAndDrop handleTransactions={handleTransactions} />
      <h1 className="text-xl pt-10 pb-5">Transactions:</h1>
      <Transactions matrix={matrix} />
      <Toaster />
    </main>
  );
}
