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
import {
  formatDateToChartDate,
  getDatesAxisX,
  getRangeAxisX,
  parseDateToISO,
  sumTransactionsByDate,
} from "@/lib/utils";
import { CustomTooltip } from "../ui/graph-utils";

interface ChartData {
  name: string;
  spent: number;
}

export default function ExpensesChart() {
  const { filteredTransactions, currency, selected } = useContext(AppContext);
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
    let addedData: ChartData[] = [];
    const datesAxisX = getDatesAxisX(selected!);
    datesAxisX.forEach((date) => {
      const found = dataArray.find((data) => {
        return data.name === date;
      });
      if (!found) {
        addedData.push({
          name: date,
          spent: 0,
        });
      }
    });

    const combinedData = [...dataArray, ...addedData].sort((a, b) => {
      return (
        parseDateToISO(a.name).getTime() - parseDateToISO(b.name).getTime()
      );
    });

    const sumData = sumTransactionsByDate(combinedData);
    setData(sumData);
  }, [filteredTransactions]);

  const range = getRangeAxisX(selected!);

  return (
    <div className="w-full md:w-1/2">
      <DashboardCard
        title="Expenses"
        description="See your daily expenses at a glance. Effortlessly understand your
        daily spending trends."
        className="p2"
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
            <Line
              type="monotone"
              dataKey="spent"
              strokeWidth={2}
              stroke="#047857"
              activeDot={{ r: 6 }}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </DashboardCard>
    </div>
  );
}
