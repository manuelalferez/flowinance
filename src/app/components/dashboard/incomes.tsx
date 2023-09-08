import { getTotalIncomes } from "@/lib/calculations";
import { DashboardContext } from "@/lib/context";
import { roundToTwoDecimal } from "@/lib/utils";
import { useContext } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

export function Incomes() {
  const { transactions } = useContext(DashboardContext);

  function getIncomes() {
    const incomes = getTotalIncomes(transactions);
    return roundToTwoDecimal(incomes);
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
