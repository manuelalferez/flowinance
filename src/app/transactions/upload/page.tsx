"use client";

import { useState } from "react";
import { DragAndDrop } from "./steps/drag-and-drop";
import { Toaster } from "../../components/ui/toaster";
import { Narbar } from "@/app/components/navbar";
import { CleanColumns } from "./steps/clean-columns";
import { CleanRows } from "./steps/clean-rows";
import { CategorizeColumns } from "./steps/categorize-columns";

export default function Page() {
  const [transactions, setTransactions] = useState<string[][]>([]);
  const [step, setStep] = useState(0);

  function nextStep() {
    setStep(step + 1);
  }
  function prevStep() {
    setStep(step - 1);
  }
  function uploadTransactions(matrix: string[][]) {
    setTransactions(matrix);
    nextStep();
  }
  return (
    <>
      <Narbar />
      <main className="flex min-h-screen flex-col items-center p-24">
        {renderDescription(step)}
        {renderStep(
          step,
          uploadTransactions,
          transactions,
          setTransactions,
          nextStep
        )}
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
      content:
        "Exclude any unwanted columns. Ensure three columns remain: one for date, another for concept, and one for amount.",
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

function renderStep(
  step: number,
  uploadTransactions: (transactions: string[][]) => void,
  transactions: string[][],
  setTransactions: (transactions: string[][]) => void,
  nextStep: () => void
): JSX.Element {
  if (step === 1) {
    return (
      <CleanColumns
        transactions={transactions}
        updateTransactions={setTransactions}
        nextStep={nextStep}
      />
    );
  }
  if (step === 2) {
    return (
      <CategorizeColumns
        transactions={transactions}
        updateTransactions={setTransactions}
        nextStep={nextStep}
      />
    );
  }
  if (step === 3) {
    return (
      <CleanRows
        transactions={transactions}
        updateTransactions={setTransactions}
        nextStep={nextStep}
      />
    );
  }

  return <DragAndDrop uploadTransactions={uploadTransactions} />;
}
