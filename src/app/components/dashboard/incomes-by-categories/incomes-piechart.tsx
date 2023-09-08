import { INCOMES_CATEGORIES } from "@/lib/categories";
import { PIE_CHART_COLORS } from "@/lib/constants";
import { DashboardContext } from "@/lib/context";
import { roundToTwoDecimal } from "@/lib/utils";
import React, { useContext, useEffect, useState } from "react";
import { PieChart, Pie, Tooltip, Cell } from "recharts";
import { DashboardCard } from "../ui/dashboard-card";
import { DashboardNoDataCard } from "../ui/dashboard-no-data-card";

interface ChartData {
  name: string;
  value: number;
}

export function IncomesPieChart() {
  const { transactions } = useContext(DashboardContext);
  const [data, setData] = useState<ChartData[]>([]);

  useEffect(() => {
    const incomes = transactions.filter((transaction) => {
      return INCOMES_CATEGORIES.some(
        (category) => category === transaction.category
      );
    });
    const dataArray = INCOMES_CATEGORIES.map((category) => {
      const totalForCategory = incomes.reduce((acc, curr) => {
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
  }, [transactions]);

  return data ? (
    <DashboardCard title="Incomes by category">
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
      title="Incomes by category"
      description=" You have not generated any income so far."
    />
  );
}
