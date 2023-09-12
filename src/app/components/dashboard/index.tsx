"use client";

import { useSupabase } from "@/app/supabase-provider";
import { Transaction } from "@/app/types/global";
import { AppContext } from "@/lib/context";
import { decryptTransactions, getTransactions, getUserId } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Balance } from "./total/balance";
import { Expenses } from "./total/expenses";
import { Incomes } from "./total/incomes";
import ExpensesChart from "./expenses/expenses-chart";
import IncomesChart from "./incomes/incomes-chart";
import Link from "next/link";
import { IncomesPieChart } from "./incomes-by-categories/incomes-piechart";
import { ExpensesPieChart } from "./expenses-by-categories/expenses-piechart";
import { ExpensesTable } from "./expenses-by-categories/expenses-table";
import { IncomesTable } from "./incomes-by-categories/incomes-table";
import ExpensesEvolutionChart from "./expenses/expenses-evolution-chart";
import IncomesEvolutionChart from "./incomes/incomes-evolution-chart";
import { DashboardRow } from "./ui/dashboard-row";
import { LastTransactions } from "./last-transactions";
import Loading from "@/app/loading";

export default function Dashboard() {
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

  return transactions.length !== 0 ? (
    <AppContext.Provider value={{ transactions }}>
      <div className="flex flex-col w-1/2 gap-10">
        <DashboardRow className="justify-between mb-10">
          <Balance />
          <div className="flex gap-2">
            <Expenses />
            <Incomes />
          </div>
        </DashboardRow>

        <DashboardRow className="justify-center">
          <ExpensesTable />
          <IncomesTable />
        </DashboardRow>

        <DashboardRow className="justify-center">
          <ExpensesPieChart />
          <IncomesPieChart />
        </DashboardRow>

        <DashboardRow className="justify-center">
          <ExpensesChart />
          <IncomesChart />
        </DashboardRow>

        <DashboardRow className="justify-center">
          <ExpensesEvolutionChart />
          <IncomesEvolutionChart />
        </DashboardRow>
        <DashboardRow className="justify-center">
          <LastTransactions />
        </DashboardRow>
      </div>
    </AppContext.Provider>
  ) : (
    <Loading />
  );
}
