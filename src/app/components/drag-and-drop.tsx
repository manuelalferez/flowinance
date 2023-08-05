"use client";

import { extractFields } from "@/lib/utils";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

export function DragAndDrop() {
  const onDrop = useCallback((acceptedFiles: any[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        const result = reader.result;

        if (result) {
          const binaryStr = new TextDecoder().decode(result as ArrayBuffer);
          const lines = binaryStr.split("\n");
          extractFields(lines);
        }
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "text/csv": [".csv"],
    },
  });

  return (
    <div
      {...getRootProps()}
      className="border-black border-2 border-dashed rounded-sm py-10 px-4 hover:cursor-pointer"
    >
      <input {...getInputProps()} />
      <p>
        Drag and drop your <b>csv</b> file here
      </p>
    </div>
  );
}
