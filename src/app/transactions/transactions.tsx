"use client";

import { AppContext } from "@/lib/context";
import { decryptTransactions, getTransactions, getUserId } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";
import { DashboardCard } from "../components/dashboard/ui/dashboard-card";
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
        setTransactions(decryptData);
      }
    };

    fetchData();
  }, []);

  return (
    <AppContext.Provider value={{ transactions }}>
      <div className="flex flex-col items-start mb-10">
        <Button asChild>
          <Link href="/transactions/upload">Upload</Link>
        </Button>
      </div>
      {transactions.length != 0 ? <TransactionsTable /> : <Loading />}
    </AppContext.Provider>
  );
}
