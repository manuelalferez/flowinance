"use client";

import { useSupabase } from "@/app/supabase-provider";
import { Transaction } from "@/app/types/global";
import { AppContext } from "@/lib/context";
import {
  decryptTransactions,
  getCurrency,
  getDates,
  getTransactions,
  getUserId,
} from "@/lib/utils";
import { useEffect, useState } from "react";
import { Balance } from "./total/balance";
import { Expenses } from "./total/expenses";
import { Incomes } from "./total/incomes";
import { Savings } from "./total/savings";
import ExpensesChart from "./expenses/expenses-chart";
import IncomesChart from "./incomes/incomes-chart";
import { IncomesPieChart } from "./incomes-by-categories/incomes-piechart";
import { ExpensesPieChart } from "./expenses-by-categories/expenses-piechart";
import { ExpensesTable } from "./expenses-by-categories/expenses-table";
import { IncomesTable } from "./incomes-by-categories/incomes-table";
import ExpensesEvolutionChart from "./expenses/expenses-evolution-chart";
import IncomesEvolutionChart from "./incomes/incomes-evolution-chart";
import { DashboardRow } from "./ui/dashboard-row";
import { LastTransactions } from "./last-transactions";
import Loading from "@/app/loading";
import { Filter } from "./filter";
import { useToast } from "../../components/ui/use-toast";
import NoTransactions from "./ui/no-transactions";
import SummaryChart from "./total/summary";
import { currencies } from "@/lib/constants";

export default function Dashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<
    Transaction[]
  >([]);
  const [loading, setLoading] = useState(true);
  const { supabase } = useSupabase();
  const [selected, setSelected] = useState(2);
  const [currency, setCurrency] = useState("€");
  const { toast } = useToast();

  useEffect(() => {
    async function fetchData() {
      const userId = await getUserId(supabase);
      if (!userId) {
        return;
      }
      try {
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

        const currency = await getCurrency(supabase);
        setCurrency(currencies.find((c) => c.name === currency)!.symbol);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    }

    fetchData();
  }, []);

  useEffect(() => {
    const days = getNumDays();
    const dates = getDates(days);
    const filtered = transactions.filter((transaction) => {
      return dates.includes(transaction.date);
    });
    setFilteredTransactions(filtered);
  }, [selected, transactions]);

  function getNumDays() {
    if (isYearSelected()) {
      return 365;
    }
    if (isLastThreeMonthsSelected()) {
      return 90;
    }
    if (isMonthSelected()) {
      return 30;
    }
    return 7;
  }

  function isYearSelected() {
    return selected === 0;
  }

  function isLastThreeMonthsSelected() {
    return selected === 1;
  }

  function isMonthSelected() {
    return selected === 2;
  }

  return (
    <div className="flex flex-col w-full md:5/6 lg:w-4/6 gap-2">
      <AppContext.Provider
        value={{
          filteredTransactions,
          transactions,
          selected,
          setSelected,
          currency,
        }}
      >
        <div className="flex justify-center md:justify-start w-full">
          <h1 className="text-4xl font-semibold text-gray-800 mb-4">
            Dashboard
          </h1>
        </div>
        {loading ? (
          <Loading />
        ) : transactions.length !== 0 ? (
          <>
            <Filter />
            <DashboardRow className="justify-between flex-wrap md:flex-nowrap mt-4">
              <Balance />
              <div className="flex gap-0 sm:gap-1  w-full md:w-2/3">
                <Expenses />
                <Incomes />
                <Savings />
              </div>
            </DashboardRow>

            <DashboardRow className="justify-center flex-wrap">
              <SummaryChart />
            </DashboardRow>

            <DashboardRow className="justify-center flex-wrap">
              <ExpensesTable />
              <IncomesTable />
            </DashboardRow>

            <DashboardRow className="justify-between flex-wrap md:flex-nowrap">
              <ExpensesPieChart />
              <IncomesPieChart />
            </DashboardRow>

            <DashboardRow className="justify-between flex-wrap lg:flex-nowrap">
              <ExpensesChart />
              <IncomesChart />
            </DashboardRow>

            <DashboardRow className="justify-between flex-wrap lg:flex-nowrap">
              <ExpensesEvolutionChart />
              <IncomesEvolutionChart />
            </DashboardRow>

            <DashboardRow className="justify-center">
              <LastTransactions />
            </DashboardRow>
          </>
         ) : (
          <NoTransactions />
        )} 
      </AppContext.Provider>
    </div>
  );
}
