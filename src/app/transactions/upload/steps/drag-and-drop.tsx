"use client";

import { extractFields } from "@/lib/utils";
import React, { useCallback, useContext } from "react";
import { useDropzone } from "react-dropzone";
import { UploadTransactionsContext } from "../page";

export function DragAndDrop() {
  const { uploadTransactions } = useContext(UploadTransactionsContext);
  const onDrop = useCallback(
    (acceptedFiles: any[]) => {
      acceptedFiles.forEach((file) => {
        const reader = new FileReader();

        reader.onabort = () => console.log("file reading was aborted");
        reader.onerror = () => console.log("file reading has failed");
        reader.onload = () => {
          const result = reader.result;

          if (result) {
            const binaryStr = new TextDecoder().decode(result as ArrayBuffer);
            const lines = binaryStr.split("\n");
            const transactions = extractFields(lines);
            uploadTransactions(transactions);
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
    <>
      <div>
        <h1 className="text-xl pb-2">Step 1: Upload your transactions</h1>
        <p className="pb-10">
          Just drag and drop your transaction file right here 👇
        </p>
      </div>
      <div
        {...getRootProps()}
        className="border-black border-2 border-dashed rounded-sm py-10 px-4 hover:cursor-pointer"
      >
        <input {...getInputProps()} />
        <p>
          Drag and drop your <b>csv</b> file here
        </p>
      </div>
    </>
  );
}
