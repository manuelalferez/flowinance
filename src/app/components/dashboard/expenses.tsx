import { EXPENSES_CATEGORIES } from "@/lib/categories";
import { DashboardContext } from "@/lib/context";
import * as React from "react";
import { useContext } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

export function Expenses() {
  const { transactions } = useContext(DashboardContext);

  function getExpenses() {
    const incomes = transactions.reduce((acc, curr) => {
      if (EXPENSES_CATEGORIES.some((category) => category === curr.category)) {
        return acc + curr.amount;
      }
      return acc;
    }, 0);

    return Math.abs(incomes);
  }

  return (
    <Card className="pr-6">
      <CardHeader>
        <CardDescription>Expenses</CardDescription>
        <CardTitle className="text-red-500">-{getExpenses()}€</CardTitle>
      </CardHeader>
    </Card>
  );
}
