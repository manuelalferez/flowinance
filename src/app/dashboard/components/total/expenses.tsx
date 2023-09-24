import { getTotalExpenses } from "@/lib/calculations";
import { AppContext } from "@/lib/context";
import { formatNumberWithTwoDecimals, roundToTwoDecimal } from "@/lib/utils";
import * as React from "react";
import { useContext } from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";

export function Expenses() {
  const { filteredTransactions, currency } = useContext(AppContext);

  function getExpenses() {
    const expenses = getTotalExpenses(filteredTransactions!);
    return roundToTwoDecimal(expenses);
  }

  const expenses = getExpenses();

  return (
    <Card className="pr-6 w-1/2">
      <CardHeader>
        <CardDescription>Expenses</CardDescription>
        <CardTitle className="text-red-500 text-2xl font-mono tabular-nums">
          {expenses !== 0 && "-"}
          {formatNumberWithTwoDecimals(expenses)}
          {currency}
        </CardTitle>
      </CardHeader>
    </Card>
  );
}
