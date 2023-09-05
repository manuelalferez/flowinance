"use client";

import { createContext, useState } from "react";
import { DragAndDrop } from "./steps/drag-and-drop";
import { Toaster } from "../../components/ui/toaster";
import { Narbar } from "@/app/components/navbar";
import { CleanColumns } from "./steps/clean-columns";
import { CleanRows } from "./steps/clean-rows";
import { CategorizeColumns } from "./steps/categorize-columns";
import { CategorizeTransactions } from "./steps/categorize-transactions";

interface TransactionsContext {
  transactions: string[][];
  setTransactions: (transactions: string[][]) => void;
  nextStep: () => void;
}

const defaultContext: TransactionsContext = {
  transactions: [],
  setTransactions: () => {},
  nextStep: () => {},
};

export const UploadTransactionsContext =
  createContext<TransactionsContext>(defaultContext);

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
    <UploadTransactionsContext.Provider
      value={{ transactions, setTransactions, nextStep }}
    >
      <Narbar />
      <main className="flex min-h-screen flex-col items-center p-24">
        {isFirstStep(step) && (
          <DragAndDrop uploadTransactions={uploadTransactions} />
        )}
        {isSecondStep(step) && <CleanColumns />}
        {isThirdStep(step) && <CategorizeColumns />}
        {isFourthStep(step) && <CleanRows />}
        {isFifthStep(step) && <CategorizeTransactions />}

        <Toaster />
      </main>
    </UploadTransactionsContext.Provider>
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
function isFifthStep(step: number) {
  return step === 4;
}
