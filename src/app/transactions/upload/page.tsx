"use client";

import { useState } from "react";
import { DragAndDrop } from "../components/drag-and-drop";
import { Toaster } from "../../components/ui/toaster";
import { TransactionsMatrix } from "../../types/global";
import { TransactionsViewer } from "../components";
import { Narbar } from "@/app/components/navbar";

export default function Page() {
  const [transactions, setTransactions] = useState<TransactionsMatrix>({
    transactions: [],
  });
  const [step, setStep] = useState(0);

  function nextStep() {
    setStep(step + 1);
  }
  function prevStep() {
    setStep(step - 1);
  }
  function uploadTransactions(matrix: TransactionsMatrix) {
    setTransactions(matrix);
    nextStep();
  }
  return (
    <>
      <Narbar />
      <main className="flex min-h-screen flex-col items-center p-24">
        {renderDescription(step)}
        {step == 0 && <DragAndDrop uploadTransactions={uploadTransactions} />}
        {step != 0 && <TransactionsViewer transactions={transactions} />}
        <Toaster />
      </main>
    </>
  );
}

function renderDescription(step: number): JSX.Element | null {
  const stepDescriptions = [
    {
      title: "Step 1: Upload your transactions",
      content: "Just drag and drop your transaction file right here 👇",
    },
    {
      title: "Step 2: Cleaning columns",
      content: "Remove those columns you don't want.",
    },
    {
      title: "Step 3: Cleaning rows",
      content: "Remove those rows you don't want.",
    },
  ];

  const description = stepDescriptions[step];

  if (description) {
    return (
      <div>
        <h1 className="text-xl pt-10 pb-2">{description.title}</h1>
        <p className="pb-10">{description.content}</p>
      </div>
    );
  }

  return null;
}
