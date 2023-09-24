import { EXPENSES_CATEGORIES } from "@/lib/categories";
import { AppContext } from "@/lib/context";
import React, { useContext, useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { DashboardNoDataCard } from "../ui/dashboard-no-data-card";
import { DashboardCard } from "../ui/dashboard-card";
import { formatDateToChartDate, parseDateToISO } from "@/lib/utils";
import { CustomTooltip } from "../ui/graph-utils";

interface ChartData {
  name: string;
  spent: number;
}

export default function ExpensesChart() {
  const { filteredTransactions, currency } = useContext(AppContext);
  const [data, setData] = useState<ChartData[]>([]);

  useEffect(() => {
    const expenses = filteredTransactions!.filter((transaction) => {
      return EXPENSES_CATEGORIES.some(
        (category) => category === transaction.category
      );
    });
    const dataArray = expenses.map((transaction) => {
      return {
        name: transaction.date,
        spent: transaction.amount,
      };
    });
    setData(dataArray);
  }, [filteredTransactions]);

  return (
    <div className="w-full">
      {data.length !== 0 ? (
        <DashboardCard
          title="Expenses"
          description="See your daily expenses at a glance. Effortlessly understand your
        daily spending trends."
        >
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
              className="font-mono tabular-nums text-sm"
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                opacity={0.3}
              />
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
              <Tooltip content={<CustomTooltip currency={currency} />} />
              <Line
                type="monotone"
                dataKey="spent"
                stroke="#047857"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </DashboardCard>
      ) : (
        <DashboardNoDataCard
          title="Expenses"
          description=" You have not generated any expense so far."
        />
      )}
    </div>
  );
}
