"use client";

import { useState } from "react";
import { DragAndDrop } from "./steps/drag-and-drop";
import { CleanColumns } from "./steps/clean-columns";
import { CleanRows } from "./steps/clean-rows";
import { CategorizeColumns } from "./steps/categorize-columns";
import { CategorizeTransactions } from "./steps/categorize-transactions";
import { UploadTransactionsContext } from "@/lib/context";
import { FinalStep } from "./steps/final-step";
import { deleteEmptyRowsAndColumns } from "@/lib/utils";

export default function Upload() {
  const [transactions, setTransactions] = useState<string[][]>([]);
  const [step, setStep] = useState(0);

  function nextStep() {
    setStep(step + 1);
  }

  function uploadTransactions(matrix: string[][]) {
    setTransactions(deleteEmptyRowsAndColumns(matrix));
    nextStep();
  }
  return (
    <UploadTransactionsContext.Provider
      value={{ transactions, setTransactions, nextStep, uploadTransactions }}
    >
      {isFirstStep(step) && <DragAndDrop />}
      {isSecondStep(step) && <CleanColumns />}
      {isThirdStep(step) && <CategorizeColumns />}
      {isFourthStep(step) && <CleanRows />}
      {isFifthStep(step) && <CategorizeTransactions />}
      {isFinalStep(step) && <FinalStep />}
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
function isFinalStep(step: number) {
  return step === 5;
}
