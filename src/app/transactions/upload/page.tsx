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
        {isFirstStep(step) && (
          <DragAndDrop uploadTransactions={uploadTransactions} />
        )}
        {isSecondStep(step) && (
          <CleanColumns
            transactions={transactions}
            updateTransactions={setTransactions}
            nextStep={nextStep}
          />
        )}
        {isThirdStep(step) && (
          <CategorizeColumns
            transactions={transactions}
            updateTransactions={setTransactions}
            nextStep={nextStep}
          />
        )}
        {isFourthStep(step) && (
          <CleanRows
            transactions={transactions}
            updateTransactions={setTransactions}
            nextStep={nextStep}
          />
        )}

        <Toaster />
      </main>
    </>
  );
}

function isFirstStep(step: number) {
  return step === 0;
}
function isSecondStep(step: number) {
  return step === 1;
}
function isThirdStep(step: number) {
  return step === 2;
}
function isFourthStep(step: number) {
  return step === 3;
}
