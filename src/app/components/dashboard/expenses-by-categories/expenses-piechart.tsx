import { EXPENSES_CATEGORIES } from "@/lib/categories";
import { PIE_CHART_COLORS } from "@/lib/constants";
import { AppContext } from "@/lib/context";
import { roundToTwoDecimal } from "@/lib/utils";
import React, { useContext, useEffect, useState } from "react";
import { PieChart, Pie, Tooltip, Cell } from "recharts";
import { DashboardCard } from "../ui/dashboard-card";
import { DashboardNoDataCard } from "../ui/dashboard-no-data-card";

interface ChartData {
  name: string;
  value: number;
}

export function ExpensesPieChart() {
  const { filteredTransactions } = useContext(AppContext);
  const [data, setData] = useState<ChartData[]>([]);

  useEffect(() => {
    const expenses = filteredTransactions.filter((transaction) => {
      return EXPENSES_CATEGORIES.some(
        (category) => category === transaction.category
      );
    });
    const dataArray = EXPENSES_CATEGORIES.map((category) => {
      const totalForCategory = expenses.reduce((acc, curr) => {
        if (curr.category === category) {
          return acc + curr.amount;
        }
        return acc;
      }, 0);

      if (totalForCategory === 0) {
        return null;
      }
      const totalForCategoryRounded = roundToTwoDecimal(totalForCategory);
      return {
        name: category,
        value: totalForCategoryRounded,
      };
    }).filter((item): item is ChartData => item !== null);

    setData(dataArray);
  }, [filteredTransactions]);

  return data.length !== 0 ? (
    <DashboardCard title="Expenses by category">
      <PieChart width={300} height={300}>
        <Pie
          dataKey="value"
          isAnimationActive={false}
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#4eb87d"
          label
        >
          {data.map((_, index) => (
            <Cell
              key={`cell-${index}`}
              fill={PIE_CHART_COLORS[index % PIE_CHART_COLORS.length]}
            />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </DashboardCard>
  ) : (
    <DashboardNoDataCard
      title="Expenses by category"
      description="You have not generated any expenses in this category."
    />
  );
}
