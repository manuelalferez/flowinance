"use client";

import { UploadTransactionsContext } from "@/lib/context";
import { useState, useEffect } from "react";
import { DragAndDrop } from "../upload/steps/drag-and-drop";
import { FinalStep } from "../upload/steps/final-step";
import { CardTitle } from "@/app/components/ui/card";
import { AnimationUploadingWithAI } from "./animation-uploading-with-ai";

interface UploadAiProps {
  extractFieldsUsingOpenAi: (lines: string[]) => Promise<string | undefined>;
}

const progressMessages: { [key: number]: string } = {
  0: "Uploading file...",
  10: "Starting categorization...",
  30: "Categorizing transactions...",
  80: "Almost done...",
  100: "Ready for review!",
};

export default function UploadAi({ extractFieldsUsingOpenAi }: UploadAiProps) {
  const [transactions, setTransactions] = useState<string[][]>([]);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const getProgressMessage = () => {
    const progressKeys = Object.keys(progressMessages).map(Number);
    const currentKey = progressKeys.reverse().find((key) => progress >= key);
    return progressMessages[currentKey || 0];
  };

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prevProgress + 1;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [loading]);

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
        {getProgressMessage()}
      </CardTitle>

      <div className="mt-4 w-full">
        <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
          <div
            className="bg-emerald-700 text-xs font-medium text-emerald-100 text-center p-0.5 leading-none rounded-full"
            style={{ width: `${progress}%` }}
          >
            {progress}%
          </div>
        </div>
      </div>
      <AnimationUploadingWithAI />
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
        setCountDown: () => {},
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
