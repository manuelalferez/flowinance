import { EXPENSES_CATEGORIES } from "@/lib/categories";
import { AppContext } from "@/lib/context";
import {
  formatDateToChartDate,
  getDatesAxisX,
  getRangeAxisX,
  parseDateToISO,
  roundToTwoDecimal,
  sortTransactions,
  sumTransactionsByDate,
} from "@/lib/utils";
import React, { useContext, useEffect, useState } from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  AreaChart,
  ResponsiveContainer,
} from "recharts";
import { DashboardNoDataCard } from "../ui/dashboard-no-data-card";
import { DashboardCard } from "../ui/dashboard-card";
import { CustomTooltip } from "../ui/graph-utils";

interface ChartData {
  name: string;
  expense: number;
}

export default function ExpensesEvolutionChart() {
  const { filteredTransactions, currency, selected } = useContext(AppContext);
  const [data, setData] = useState<ChartData[]>([]);

  useEffect(() => {
    const expenses = filteredTransactions!.filter((transaction) => {
      return EXPENSES_CATEGORIES.some(
        (category) => category === transaction.category
      );
    });
    const shortedExpenses = sortTransactions(expenses);
    let accumulatedAmount = 0;
    const accumulatedExpenses = shortedExpenses.map((expense) => {
      accumulatedAmount += expense.amount;
      return roundToTwoDecimal(accumulatedAmount);
    });
    const dataArray = shortedExpenses.map((transaction, index) => {
      return {
        name: transaction.date,
        expense: accumulatedExpenses[index],
      };
    });
    let addedData: ChartData[] = [];
    const datesAxisX = getDatesAxisX(selected!);
    datesAxisX.forEach((date) => {
      const found = dataArray.find((data) => {
        return data.name === date;
      });
      if (!found) {
        addedData.push({
          name: date,
          expense: 0,
        });
      }
    });

    const combinedData = [...dataArray, ...addedData].sort((a, b) => {
      return (
        parseDateToISO(a.name).getTime() - parseDateToISO(b.name).getTime()
      );
    });

    const sumData = sumTransactionsByDate(combinedData);
    let lastAccumulatedExpense = 0;
    sumData.forEach((item) => {
      if (item.expense === 0) {
        item.expense = lastAccumulatedExpense;
      }
      if (item.expense !== 0) {
        lastAccumulatedExpense = item.expense;
      }
    });

    setData(sumData);
  }, [filteredTransactions]);

  const range = getRangeAxisX(selected!);

  return (
    <div className="w-full md:w-1/2">
      <DashboardCard
        title="Expenses Evolution"
        description="Visualize the trend of your expenses, how they have grown over the
        days."
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
            <Tooltip content={<CustomTooltip currency={currency} />} />
            <Area
              type="monotone"
              dataKey="expense"
              strokeWidth={2}
              stroke="#047857"
              fill="#069668"
            />
          </AreaChart>
        </ResponsiveContainer>
      </DashboardCard>
    </div>
  );
}
