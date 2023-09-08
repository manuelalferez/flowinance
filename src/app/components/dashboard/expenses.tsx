import { getTotalExpenses } from "@/lib/calculations";
import { DashboardContext } from "@/lib/context";
import { roundToTwoDecimal } from "@/lib/utils";
import * as React from "react";
import { useContext } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

export function Expenses() {
  const { transactions } = useContext(DashboardContext);

  function getExpenses() {
    const incomes = getTotalExpenses(transactions);

    return roundToTwoDecimal(incomes);
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
