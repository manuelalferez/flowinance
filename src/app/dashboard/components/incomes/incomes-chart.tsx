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
  income: number;
}

export default function IncomesChart() {
  const { filteredTransactions, currency, selected } = useContext(AppContext);
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
    let addedData: ChartData[] = [];
    const datesAxisX = getDatesAxisX(selected!);
    datesAxisX.forEach((date) => {
      const found = dataArray.find((data) => {
        return data.name === date;
      });
      if (!found) {
        addedData.push({
          name: date,
          income: 0,
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
              dataKey="income"
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
