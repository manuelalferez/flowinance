"use client";

import { UploadTransactionsContext } from "@/lib/context";
import { useState } from "react";
import { DragAndDrop } from "../upload/steps/drag-and-drop";
import { FinalStep } from "../upload/steps/final-step";
import Loading from "@/app/loading";
import { CardTitle } from "@/app/components/ui/card";

export default function UploadAi() {
  const [transactions, setTransactions] = useState<string[][]>([]);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);

  function nextStep() {
    setStep(step + 1);
  }

  function uploadTransactions(matrix: string[][]) {
    setTransactions(matrix);
    nextStep();
  }
  return loading ? (
    <div>
      <CardTitle>
        We&apos;re doing all the magic 🪄. It&apos;s gonna take a few seconds.{" "}
      </CardTitle>
      <Loading />
    </div>
  ) : (
    <UploadTransactionsContext.Provider
      value={{
        transactions,
        setTransactions,
        nextStep,
        uploadTransactions,
        setLoading,
      }}
    >
      {isFirstStep(step) && <DragAndDrop ai={true} />}
      {isFinalStep(step) && <FinalStep />}
    </UploadTransactionsContext.Provider>
  );
}

function isFirstStep(step: number) {
  return step === 0;
}

function isFinalStep(step: number) {
  return step === 1;
}
