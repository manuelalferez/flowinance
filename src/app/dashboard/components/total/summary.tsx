import { EXPENSES_CATEGORIES, INCOMES_CATEGORIES } from "@/lib/categories";
import { AppContext } from "@/lib/context";
import {
  formatDateToChartDate,
  parseDate,
  parseDateToISO,
  roundToTwoDecimal,
  sortTransactions,
} from "@/lib/utils";
import React, { useContext, useEffect, useState } from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
  AreaChart,
  Area,
} from "recharts";
import { DashboardNoDataCard } from "../ui/dashboard-no-data-card";
import { DashboardCard } from "../ui/dashboard-card";
import { CustomTooltip, SummaryTooltip } from "../ui/graph-utils";

interface ChartData {
  name: string;
  expense: number;
  income: number;
}

export default function SummaryChart() {
  const { filteredTransactions, currency } = useContext(AppContext);
  const [data, setData] = useState<ChartData[]>([]);

  useEffect(() => {
    const expenses = filteredTransactions!.filter((transaction) => {
      return EXPENSES_CATEGORIES.some(
        (category) => category === transaction.category
      );
    });
    const shortedExpenses = sortTransactions(expenses);
    let accumulatedExpensesAmount = 0;
    const accumulatedExpenses = shortedExpenses.map((expense) => {
      accumulatedExpensesAmount += expense.amount;
      return roundToTwoDecimal(accumulatedExpensesAmount);
    });
    const incomes = filteredTransactions!.filter((transaction) => {
      return INCOMES_CATEGORIES.some(
        (category) => category === transaction.category
      );
    });
    const shortedIncomes = sortTransactions(incomes);
    let accumulatedIncomesAmount = 0;
    const accumulatedIncomes = shortedIncomes.map((expense) => {
      accumulatedIncomesAmount += expense.amount;
      return roundToTwoDecimal(accumulatedIncomesAmount);
    });
    const expensesData = shortedExpenses.map((transaction, index) => {
      return {
        name: transaction.date,
        expense: accumulatedExpenses[index],
        income: 0,
      };
    });
    const incomesData = shortedIncomes.map((transaction, index) => {
      return {
        name: transaction.date,
        income: accumulatedIncomes[index],
        expense: 0,
      };
    });
    let combinedData = [...expensesData, ...incomesData].sort(
      (a, b) => parseDate(a.name)!.getTime() - parseDate(b.name)!.getTime()
    );
    let lastAccumulatedExpense = 0;
    let lastAccumulatedIncome = 0;
    combinedData.forEach((item, index) => {
      if (item.expense === 0) {
        item.expense = lastAccumulatedExpense;
      }
      if (item.income === 0) {
        item.income = lastAccumulatedIncome;
      }
      if (item.expense !== 0) {
        lastAccumulatedExpense = item.expense;
      }
      if (item.income !== 0) {
        lastAccumulatedIncome = item.income;
      }
    });

    setData(combinedData);
  }, [filteredTransactions]);

  return (
    <div className="w-full">
      {data.length !== 0 ? (
        <DashboardCard
          title="Summary"
          description="Visualize the trend of your expenses and incomes."
        >
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 30,
                bottom: 0,
              }}
              className="font-mono tabular-nums text-sm"
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tickFormatter={(str) => {
                  const date = parseDateToISO(str);
                  if (date.getDate() % 7 === 0) {
                    return formatDateToChartDate(date);
                  }
                  return "";
                }}
              />
              <YAxis
                tickFormatter={(number) => `${number}${currency}`}
                tickCount={6}
              />
              <Legend />
              <Tooltip content={<SummaryTooltip currency={currency} />} />
              <Area
                type="monotone"
                dataKey="expense"
                stroke="#3066BE"
                fill="#B7D3F2"
              />
              <Area
                type="monotone"
                dataKey="income"
                stroke="#047857"
                fill="#06C690"
              />
            </AreaChart>
          </ResponsiveContainer>
        </DashboardCard>
      ) : (
        <DashboardNoDataCard
          title="Expenses Evolution"
          description=" You have not generated any expense so far."
        />
      )}
    </div>
  );
}
