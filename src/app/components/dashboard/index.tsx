"use client";

import { useSupabase } from "@/app/supabase-provider";
import { TransactionSupabase } from "@/app/types/global";
import { DashboardContext } from "@/lib/context";
import { getTransactions, getUserId } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Balance } from "./balance";
import { Expenses } from "./expenses";
import { Incomes } from "./incomes";
import ExpensesChart from "./expenses-chart";
import IncomesChart from "./incomes-chart";
import { useToast } from "../ui/use-toast";
import Link from "next/link";

export default function Dashboard() {
  const [transactions, setTransactions] = useState<TransactionSupabase[]>([]);
  const { supabase } = useSupabase();
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      const userId = await getUserId(supabase);

      if (!userId) {
        toast({
          description: "Error uploading transactions, try again later",
        });
        return;
      }
      const data = await getTransactions(supabase, userId);
      if (data) {
        setTransactions(data);
      }
    };

    fetchData();
  }, []);

  return transactions.length !== 0 ? (
    <DashboardContext.Provider value={{ transactions }}>
      <div className="flex flex-col w-2/3 gap-20">
        <div className="flex justify-around">
          <Balance />
          <div className="flex gap-2">
            <Expenses />
            <Incomes />
          </div>
        </div>
        <ExpensesChart />
        <IncomesChart />
      </div>
    </DashboardContext.Provider>
  ) : (
    <div className="flex flex-col">
      <h1 className="text-xl mb-2">Welcome to Finance Graph 💸</h1>
      <button className="max-w-xs p-4 text-lg bg-black hover:bg-gray-800 rounded-md text-white">
        <Link href="/signin">Sign in to start</Link>
      </button>
    </div>
  );
}
