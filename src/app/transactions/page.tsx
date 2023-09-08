"use client";

import { decryptTransactions, getTransactions, getUserId } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";
import { DashboardCard } from "../components/dashboard/ui/dashboard-card";
import { Button } from "../components/ui/button";
import { useSupabase } from "../supabase-provider";
import { Transaction } from "../types/global";
import { TransactionsTable } from "./ui/transactions-table";

export default async function Page() {
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
    <>
      <main className="flex min-h-screen flex-col  p-24">
        <div className="flex flex-col items-start mb-10">
          <Button asChild>
            <Link href="/transactions/upload">Upload</Link>
          </Button>
        </div>
        {transactions.length != 0 ? (
          <TransactionsTable transactions={transactions} />
        ) : (
          <DashboardCard title="No transactions yet">
            <p>
              Click 'Upload' to begin viewing your transactions in this section
            </p>
          </DashboardCard>
        )}
      </main>
    </>
  );
}
