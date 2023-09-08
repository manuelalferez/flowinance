"use client";

import { AppContext } from "@/lib/context";
import {
  decryptTransactions,
  getTransactions,
  getUserId,
  sortTransactions,
} from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import Loading from "../loading";
import { useSupabase } from "../supabase-provider";
import { Transaction } from "../types/global";
import { TransactionsTable } from "./ui/transactions-table";

export default function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const { supabase } = useSupabase();

  useEffect(() => {
    const fetchData = async () => {
      const userId = await getUserId(supabase);

      if (!userId) {
        return;
      }
      const data = await getTransactions(supabase, userId);
      if (data) {
        const decryptData = decryptTransactions(data, userId);
        const sortedTransactions = sortTransactions(decryptData);
        setTransactions(sortedTransactions);
      }
    };

    fetchData();
  }, []);

  return (
    <AppContext.Provider value={{ transactions }}>
      <div className="flex items-start mb-10 gap-2">
        <Button asChild>
          <Link href="/transactions/upload">Upload</Link>
        </Button>
        <Button asChild>
          <Link href="/transactions/add">Add</Link>
        </Button>
      </div>
      {transactions.length != 0 ? <TransactionsTable /> : <Loading />}
    </AppContext.Provider>
  );
}
