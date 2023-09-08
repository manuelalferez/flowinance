import { INCOMES_CATEGORIES } from "@/lib/categories";
import { DashboardContext } from "@/lib/context";
import React, { useContext, useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Card, CardTitle } from "../ui/card";
import { DashboardNoDataCard } from "./dashboard-no-data-card";

interface ChartData {
  name: string;
  income: number;
}

export default function IncomesChart() {
  const { transactions } = useContext(DashboardContext);
  const [data, setData] = useState<ChartData[]>([]);
  useEffect(() => {
    const incomes = transactions.filter((transaction) => {
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
  }, [transactions]);
  return (
    <div>
      {data.length !== 0 ? (
        <Card className="flex flex-col items-center p-8">
          <CardTitle className="mb-6">Incomes</CardTitle>
          <LineChart
            width={600}
            height={300}
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="income"
              stroke="#4eb87d"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </Card>
      ) : (
        <DashboardNoDataCard
          title="Incomes"
          description=" You have not generated any income so far."
        />
      )}
    </div>
  );
}
