import { INCOMES_CATEGORIES } from "@/lib/categories";
import { DashboardContext } from "@/lib/context";
import { useContext } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

export function Incomes() {
  const { transactions } = useContext(DashboardContext);

  function getIncomes() {
    const incomes = transactions.reduce((acc, curr) => {
      if (INCOMES_CATEGORIES.some((category) => category === curr.category)) {
        return acc + curr.amount;
      }
      return acc;
    }, 0);

    return Math.abs(incomes);
  }

  return (
    <Card className="pr-6">
      <CardHeader>
        <CardDescription>Incomes</CardDescription>
        <CardTitle className="text-green-500">+{getIncomes()}€</CardTitle>
      </CardHeader>
    </Card>
  );
}
