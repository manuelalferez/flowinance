import { getTotalExpenses, getTotalIncomes } from "@/lib/calculations";
import { DashboardContext } from "@/lib/context";
import { roundToTwoDecimal } from "@/lib/utils";
import { useContext } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

export function Balance() {
  const { transactions } = useContext(DashboardContext);

  function getBalance() {
    const expenses = getTotalExpenses(transactions);
    const incomes = getTotalIncomes(transactions);
    const balance = incomes - expenses;

    return roundToTwoDecimal(balance);
  }

  return (
    <Card className="pr-14">
      <CardHeader>
        <CardDescription>Balance</CardDescription>
        <CardTitle>{getBalance()}€</CardTitle>
      </CardHeader>
    </Card>
  );
}
