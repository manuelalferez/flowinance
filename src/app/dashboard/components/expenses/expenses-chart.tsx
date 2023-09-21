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
  Legend,
} from "recharts";
import { DashboardNoDataCard } from "../ui/dashboard-no-data-card";
import { DashboardCard } from "../ui/dashboard-card";
import { getDimensionsCharts } from "@/lib/utils";

interface ChartData {
  name: string;
  spent: number;
}

export default function ExpensesChart() {
  const { filteredTransactions } = useContext(AppContext);
  const [data, setData] = useState<ChartData[]>([]);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

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
    updateDimensions();
  }, [filteredTransactions]);

  function updateDimensions() {
    const screenWidth = window.innerWidth;
    const { newWidth, newHeight } = getDimensionsCharts(screenWidth);
    setWidth(newWidth);
    setHeight(newHeight);
  }

  window.addEventListener("resize", updateDimensions);

  return (
    <div>
      {data.length !== 0 ? (
        <DashboardCard
          title="Expenses"
          description="See your daily expenses at a glance. Effortlessly understand your
        daily spending trends."
        >
          <LineChart
            width={width}
            height={height}
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
              dataKey="spent"
              stroke="#4eb87d"
              activeDot={{ r: 8 }}
            />
          </LineChart>
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
