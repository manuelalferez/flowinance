"use client";

import React, { useState } from "react";
import {
  LocalStorage,
  decryptTransactions,
  getTransactionsFromSupabase,
  getUserId,
} from "@/lib/utils";
import { useSupabase } from "@/app/supabase-provider";
import { useToast } from "@/app/components/ui/use-toast";
import { Button } from "@/app/components/ui/button";
import { Transaction } from "@/app/types/global";

function objectArrayToCsvString(
  array: any[],
  delimiter: string = ",",
  headers: any[]
) {
  const rows = array.map((obj) => [
    obj.date,
    obj.concept,
    obj.amount,
    obj.category,
  ]);
  return [headers, ...rows].map((row) => row.join(delimiter)).join("\n");
}

function downloadCSV(data: Transaction[]) {
  const delimiter = localStorage.getItem(LocalStorage.delimiter);
  const csvString = objectArrayToCsvString(data, delimiter ?? ",", [
    "date",
    "concept",
    "amount",
    "category",
  ]);

  const blob = new Blob([csvString], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "transactions.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function ExportTransactions() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { supabase } = useSupabase();
  const { toast } = useToast();

  async function getAllTransactions() {
    setIsLoading(true);
    const userId = await getUserId(supabase);
    if (!userId) {
      return;
    }
    try {
      const data = await getTransactionsFromSupabase(supabase);
      if (!data) {
        toast({
          description:
            "❎ Error fetching transactions. Please, try again later.",
        });
      } else {
        const decryptData = decryptTransactions(data, userId ?? "");
        downloadCSV(decryptData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsLoading(false);
  }
  return (
    <div>
      <h3 className="text-lg font-medium">Export</h3>
      <p className="text-sm text-muted-foreground">
        Export all your transactions into a .csv file
      </p>
      <br />
      <Button
        className="bg-emerald-700 hover:bg-emerald-600"
        onClick={getAllTransactions}
      >
        {!isLoading ? (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              className="mr-1"
            >
              <path
                fill="currentColor"
                d="M13 13.15V10q0-.425-.288-.712T12 9t-.712.288T11 10v3.15l-.9-.875Q9.825 12 9.413 12t-.713.3q-.275.275-.275.7t.275.7l2.6 2.6q.3.3.7.3t.7-.3l2.6-2.6q.275-.275.287-.687T15.3 12.3q-.275-.275-.687-.288t-.713.263zM6 22q-.825 0-1.412-.587T4 20V8.825q0-.4.15-.762t.425-.638l4.85-4.85q.275-.275.638-.425t.762-.15H18q.825 0 1.413.588T20 4v16q0 .825-.587 1.413T18 22zm0-2h12V4h-7.15L6 8.85zm0 0h12z"
              />
            </svg>
            <span>Export all transactions</span>
          </>
        ) : (
          <>
            <span className="mr-2">Downloading...</span>
            <svg
              aria-hidden="true"
              className="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-emerald-400"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </>
        )}
      </Button>
    </div>
  );
}
