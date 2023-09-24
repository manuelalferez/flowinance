import { EXPENSES_CATEGORIES } from "@/lib/categories";
import { PIE_CHART_COLORS } from "@/lib/constants";
import { AppContext } from "@/lib/context";
import { roundToTwoDecimal } from "@/lib/utils";
import React, { useContext, useEffect, useState } from "react";
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";
import { DashboardCard } from "../ui/dashboard-card";
import { DashboardNoDataCard } from "../ui/dashboard-no-data-card";
import { PieChartTooltip } from "../ui/graph-utils";

interface ChartData {
  name: string;
  value: number;
}

export function ExpensesPieChart() {
  const { filteredTransactions, currency } = useContext(AppContext);
  const [data, setData] = useState<ChartData[]>([]);

  useEffect(() => {
    const expenses = filteredTransactions!.filter((transaction) => {
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
    })
      .filter((item): item is ChartData => item !== null)
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);

    setData(dataArray);
  }, [filteredTransactions]);

  return data.length !== 0 ? (
    <DashboardCard
      title="Your top 5 expenses"
      description="Explore a visual breakdown of your expenses using a pie chart. Pie
    charts provide an intuitive representation, making it easy to see how
    your expenses are distributed among the different categories."
      className="w-full md:w-1/2"
    >
      <ResponsiveContainer width="100%" height={400}>
        <PieChart className="font-mono tabular-nums">
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
          <Tooltip content={<PieChartTooltip currency={currency} />} />
        </PieChart>
      </ResponsiveContainer>
    </DashboardCard>
  ) : (
    <DashboardNoDataCard
      title="Expenses by category"
      description="You have not generated any expense so far."
    />
  );
}
