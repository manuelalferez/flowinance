"use client";

import { Alert, AlertDescription, AlertTitle } from "@/app/components/ui/alert";
import { useToast } from "@/app/components/ui/use-toast";
import { LIMIT_TRANSACTIONS_TO_UPLOAD } from "@/lib/constants";
import { UploadTransactionsContext } from "@/lib/context";
import { extractFields, extractFieldsUsingOpenAi } from "@/lib/utils";
import React, { useCallback, useContext } from "react";
import { useDropzone } from "react-dropzone";

export function DragAndDrop({ ai }: { ai?: boolean }) {
  const { uploadTransactions, setLoading } = useContext(
    UploadTransactionsContext
  );
  const { toast } = useToast();
  const onDrop = useCallback(
    (acceptedFiles: any[]) => {
      acceptedFiles.forEach((file) => {
        const reader = new FileReader();

        reader.onabort = () => console.log("file reading was aborted");
        reader.onerror = () => console.log("file reading has failed");
        reader.onload = async () => {
          const result = reader.result;

          if (result) {
            const binaryStr = new TextDecoder().decode(result as ArrayBuffer);
            const lines = binaryStr.split("\n");
            if (ai) {
              if (lines.length > LIMIT_TRANSACTIONS_TO_UPLOAD) {
                toast({
                  description: `❎ You can only upload ${LIMIT_TRANSACTIONS_TO_UPLOAD} transactions at a time.`,
                });
                return;
              }
              setLoading!(true);
              const transactions = await extractFieldsUsingOpenAi(lines);
              setLoading!(false);
              if (transactions) {
                uploadTransactions(transactions);
              }
            } else {
              const transactions = extractFields(lines);
              uploadTransactions(transactions);
            }
          }
        };
        reader.readAsArrayBuffer(file);
      });
    },
    [uploadTransactions]
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "text/csv": [".csv"],
    },
  });

  return (
    <div>
      <div>
        <Alert
          className={
            ai ? "mb-2 text-2xl border-none" : "mb-10 text-2xl border-none"
          }
        >
          <AlertTitle>Upload your file</AlertTitle>
          <AlertDescription>
            Just drag and drop your transaction file right here 👇
          </AlertDescription>
        </Alert>
        {ai && (
          <Alert className="mb-10 bg-emerald-50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 24 24"
            >
              <g fill="currentColor">
                <path d="M12 6a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0V7a1 1 0 0 1 1-1Zm0 10a1 1 0 1 0 0 2a1 1 0 0 0 0-2Z" />
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2ZM4 12a8 8 0 1 0 16 0a8 8 0 0 0-16 0Z"
                  clipRule="evenodd"
                />
              </g>
            </svg>
            <AlertTitle>Note</AlertTitle>
            <AlertDescription>
              You can upload {LIMIT_TRANSACTIONS_TO_UPLOAD} transactions at a
              time.
            </AlertDescription>
          </Alert>
        )}
      </div>
      <div
        {...getRootProps()}
        className="border-black border-2 border-dashed rounded-sm p-10 md:p-20 lg:p-28 hover:cursor-pointer"
      >
        <input {...getInputProps()} />
        <p>
          Drag and drop your <b>csv</b> file here
        </p>
      </div>
    </div>
  );
}
