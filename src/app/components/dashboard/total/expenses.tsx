import { getTotalExpenses } from "@/lib/calculations";
import { AppContext } from "@/lib/context";
import { roundToTwoDecimal } from "@/lib/utils";
import * as React from "react";
import { useContext } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../../ui/card";

export function Expenses() {
  const { filteredTransactions } = useContext(AppContext);

  function getExpenses() {
    const incomes = getTotalExpenses(filteredTransactions!);

    return roundToTwoDecimal(incomes);
  }

  return (
    <Card className="pr-6">
      <CardHeader>
        <CardDescription>Expenses</CardDescription>
        <CardTitle className="text-red-500 text-xl">
          -{getExpenses()}€
        </CardTitle>
      </CardHeader>
    </Card>
  );
}
