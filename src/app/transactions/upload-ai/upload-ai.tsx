"use client";

import { UploadTransactionsContext } from "@/lib/context";
import { useState } from "react";
import { DragAndDrop } from "../upload/steps/drag-and-drop";
import { FinalStep } from "../upload/steps/final-step";
import Loading from "@/app/loading";
import { CardTitle } from "@/app/components/ui/card";
import Countdown from "react-countdown";

interface UploadAiProps {
  extractFieldsUsingOpenAi: (lines: string[]) => Promise<string | undefined>;
}

export default function UploadAi({ extractFieldsUsingOpenAi }: UploadAiProps) {
  const [transactions, setTransactions] = useState<string[][]>([]);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);
  const [countDown, setCountDown] = useState(0);

  function nextStep() {
    setStep(step + 1);
  }

  function uploadTransactions(matrix: string[][]) {
    setTransactions(matrix);
    nextStep();
  }

  function setError() {
    setLoading(false);
    setStep(0);
  }

  return loading ? (
    <div>
      <CardTitle className="flex flex-col items-center gap-2">
        We&apos;re doing all the magic 🪄
        {countDown != 0 && (
          <Countdown date={Date.now() + countDown} renderer={renderer} />
        )}
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
        extractFieldsUsingOpenAi,
        setCountDown,
        setError,
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

const renderer = ({ hours, minutes, seconds, completed }: any) => {
  if (completed) {
    return <Completionist />;
  } else {
    return (
      <span className="text-xl bg-emerald-50 p-2 rounded-md w-fit">
        Time left: {String(minutes % 60).padStart(2, "0")}m{" "}
        {String(seconds % 60).padStart(2, "0")}s
      </span>
    );
  }
};

const Completionist = () => (
  <span className="text-xl bg-emerald-50 p-2 rounded-md w-fit">
    Ready to roll!
  </span>
);
