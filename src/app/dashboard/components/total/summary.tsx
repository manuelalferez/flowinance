import { EXPENSES_CATEGORIES, INCOMES_CATEGORIES } from "@/lib/categories";
import { AppContext } from "@/lib/context";
import {
  formatDateToChartDate,
  getDatesAxisX,
  getRangeAxisX,
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
  Legend,
  LineChart,
  Line,
} from "recharts";
import { DashboardNoDataCard } from "../ui/dashboard-no-data-card";
import { DashboardCard } from "../ui/dashboard-card";
import { SummaryTooltip } from "../ui/graph-utils";

interface ChartData {
  name: string;
  expense: number;
  income: number;
}

export default function SummaryChart() {
  const { filteredTransactions, currency, selected } = useContext(AppContext);
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

    let combinedExpensesAndIncomes = [...expensesData, ...incomesData].sort(
      (a, b) => parseDate(a.name)!.getTime() - parseDate(b.name)!.getTime()
    );
    let addedData: ChartData[] = [];
    const datesAxisX = getDatesAxisX(selected!);
    datesAxisX.forEach((date) => {
      const found = combinedExpensesAndIncomes.find((data) => {
        return data.name === date;
      });
      if (!found) {
        addedData.push({
          name: date,
          expense: 0,
          income: 0,
        });
      }
    });
    const combinedData = [...combinedExpensesAndIncomes, ...addedData].sort(
      (a, b) => parseDate(a.name)!.getTime() - parseDate(b.name)!.getTime()
    );
    let lastAccumulatedExpense = 0;
    let lastAccumulatedIncome = 0;
    combinedData.forEach((item) => {
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

  const range = getRangeAxisX(selected!);

  return (
    <div className="w-full">
      {data.length !== 0 ? (
        <DashboardCard
          title="Summary"
          description="Visualize the trend of your expenses and incomes."
        >
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
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
                tickFormatter={(str, index) => {
                  if (index % range === 0 && index !== 0) {
                    const date = parseDateToISO(str);
                    return formatDateToChartDate(date);
                  }
                  return "";
                }}
              />
              <YAxis
                tickFormatter={(number) => `${currency}${number}`}
                tickCount={6}
              />
              <Legend />
              <Tooltip content={<SummaryTooltip currency={currency} />} />
              <Line
                type="monotone"
                dataKey="expense"
                strokeWidth={2}
                stroke="#3066BE"
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="income"
                strokeWidth={2}
                stroke="#047857"
                dot={false}
              />
            </LineChart>
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
