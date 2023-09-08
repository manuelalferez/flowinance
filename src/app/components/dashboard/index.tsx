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
import Link from "next/link";
import { IncomesPieChart } from "./incomes-by-categories/incomes-piechart";
import { ExpensesPieChart } from "./expenses-by-categories/expenses-piechart";
import { ExpensesTable } from "./expenses-by-categories/expenses-table";
import { IncomesTable } from "./incomes-by-categories/incomes-table";

export default function Dashboard() {
  const [transactions, setTransactions] = useState<TransactionSupabase[]>([]);
  const { supabase } = useSupabase();

  useEffect(() => {
    const fetchData = async () => {
      const userId = await getUserId(supabase);

      if (!userId) {
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
        <div className="flex justify-around gap-2">
          <ExpensesTable />
          <IncomesTable />
        </div>
        <div className="flex justify-around gap-2">
          <ExpensesPieChart />
          <IncomesPieChart />
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
