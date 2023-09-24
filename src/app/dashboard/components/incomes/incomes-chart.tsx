import { INCOMES_CATEGORIES } from "@/lib/categories";
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
  income: number;
}

export default function IncomesChart() {
  const { filteredTransactions, currency } = useContext(AppContext);
  const [data, setData] = useState<ChartData[]>([]);

  useEffect(() => {
    const incomes = filteredTransactions!.filter((transaction) => {
      return INCOMES_CATEGORIES.some(
        (category) => category === transaction.category
      );
    });
    const dataArray = incomes.map((transaction) => {
      return {
        name: transaction.date,
        income: transaction.amount,
      };
    });
    setData(dataArray);
  }, [filteredTransactions]);

  return (
    <div className="w-full">
      {data.length !== 0 ? (
        <DashboardCard
          title="Incomes"
          description="See your daily incomes at a glance. Effortlessly understand your
        daily incomes trends."
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
                dataKey="income"
                stroke="#047857"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </DashboardCard>
      ) : (
        <DashboardNoDataCard
          title="Incomes"
          description=" You have not generated any income so far."
        />
      )}
    </div>
  );
}
