import { INCOMES_CATEGORIES } from "@/lib/categories";
import { AppContext } from "@/lib/context";
import { roundToTwoDecimal, sortTransactions } from "@/lib/utils";
import React, { useContext, useEffect, useState } from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  AreaChart,
} from "recharts";
import { DashboardNoDataCard } from "../ui/dashboard-no-data-card";
import { DashboardCard } from "../ui/dashboard-card";

interface ChartData {
  name: string;
  income: number;
}

export default function IncomesEvolutionChart() {
  const { filteredTransactions } = useContext(AppContext);
  const [data, setData] = useState<ChartData[]>([]);
  useEffect(() => {
    const expenses = filteredTransactions!.filter((transaction) => {
      return INCOMES_CATEGORIES.some(
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
        income: accumulatedExpenses[index],
      };
    });
    setData(dataArray);
  }, [filteredTransactions]);
  return (
    <div>
      {data.length !== 0 ? (
        <DashboardCard
          title="Incomes Evolution"
          description="Visualize the trend of your incomes, how they have grown over the
        days."
        >
          <AreaChart
            width={600}
            height={300}
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 30,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="income"
              stroke="#8884d8"
              fill="#8884d8"
            />
          </AreaChart>
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
