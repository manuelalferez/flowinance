import { INCOMES_CATEGORIES } from "@/lib/categories";
import { AppContext } from "@/lib/context";
import {
  formatDateToChartDate,
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
  Area,
  AreaChart,
  ResponsiveContainer,
} from "recharts";
import { DashboardNoDataCard } from "../ui/dashboard-no-data-card";
import { DashboardCard } from "../ui/dashboard-card";
import { CustomTooltip } from "../ui/graph-utils";

interface ChartData {
  name: string;
  income: number;
}

export default function IncomesEvolutionChart() {
  const { filteredTransactions, currency } = useContext(AppContext);
  const [data, setData] = useState<ChartData[]>([]);

  useEffect(() => {
    const incomes = filteredTransactions!.filter((transaction) => {
      return INCOMES_CATEGORIES.some(
        (category) => category === transaction.category
      );
    });
    const shortedIncomes = sortTransactions(incomes);
    let accumulatedAmount = 0;
    const accumulatedIncomes = shortedIncomes.map((expense) => {
      accumulatedAmount += expense.amount;
      return roundToTwoDecimal(accumulatedAmount);
    });
    const dataArray = shortedIncomes.map((transaction, index) => {
      return {
        name: transaction.date,
        income: accumulatedIncomes[index],
      };
    });
    setData(dataArray);
  }, [filteredTransactions]);

  return (
    <div className="w-full">
      {data.length !== 0 ? (
        <DashboardCard
          title="Incomes Evolution"
          description="Visualize the trend of your incomes, how they have grown over the
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
              <Area
                type="monotone"
                dataKey="income"
                stroke="#047857"
                fill="#069668"
              />
            </AreaChart>
          </ResponsiveContainer>
        </DashboardCard>
      ) : (
        <DashboardNoDataCard
          title="Incomes Evolution"
          description=" You have not generated any income so far."
        />
      )}
    </div>
  );
}
