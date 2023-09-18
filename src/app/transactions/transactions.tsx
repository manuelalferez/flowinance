"use client";

import { AppContext } from "@/lib/context";
import { decryptTransactions, getTransactions, getUserId } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import Loading from "../loading";
import { useSupabase } from "../supabase-provider";
import { Transaction } from "../types/global";
import { TransactionsTable } from "./ui/transactions-table";
import { useToast } from "../components/ui/use-toast";
import NoTransactions from "./ui/no-transactions";

export default function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const { supabase } = useSupabase();
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      const userId = await getUserId(supabase);
      if (!userId) {
        return;
      }
      const data = await getTransactions(supabase);

      if (!data) {
        toast({
          description:
            "❎ Error fetching transactions. Please, try again later.",
        });
      } else {
        const decryptData = decryptTransactions(data, userId);
        setTransactions(decryptData);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen mb-2 w-3/4">
      <div>
        <h1 className="text-4xl font-semibold text-gray-800 mb-6">
          Transactions
        </h1>
      </div>
      <AppContext.Provider value={{ transactions }}>
        <div className="flex items-start mb-10 gap-2 ">
          <Button asChild>
            <Link href="/transactions/upload-ai">Smart Upload</Link>
          </Button>
          <Button asChild>
            <Link href="/transactions/upload">Upload</Link>
          </Button>
          <Button asChild>
            <Link href="/transactions/add">Add</Link>
          </Button>
        </div>
        {loading ? (
          <Loading />
        ) : transactions.length !== 0 ? (
          <TransactionsTable />
        ) : (
          <NoTransactions />
        )}
      </AppContext.Provider>
    </div>
  );
}
