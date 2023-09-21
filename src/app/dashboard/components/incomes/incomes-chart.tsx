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
  Legend,
} from "recharts";
import { DashboardNoDataCard } from "../ui/dashboard-no-data-card";
import { DashboardCard } from "../ui/dashboard-card";
import { getDimensionsCharts } from "@/lib/utils";

interface ChartData {
  name: string;
  income: number;
}

export default function IncomesChart() {
  const { filteredTransactions } = useContext(AppContext);
  const [data, setData] = useState<ChartData[]>([]);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

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
          title="Incomes"
          description="See your daily incomes at a glance. Effortlessly understand your
        daily incomes trends."
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
              dataKey="income"
              stroke="#4eb87d"
              activeDot={{ r: 8 }}
            />
          </LineChart>
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
