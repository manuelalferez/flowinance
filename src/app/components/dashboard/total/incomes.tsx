import { getTotalIncomes } from "@/lib/calculations";
import { AppContext } from "@/lib/context";
import { roundToTwoDecimal } from "@/lib/utils";
import { useContext } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../../ui/card";

export function Incomes() {
  const { filteredTransactions } = useContext(AppContext);

  function getIncomes() {
    const incomes = getTotalIncomes(filteredTransactions);
    return roundToTwoDecimal(incomes);
  }

  return (
    <Card className="pr-6">
      <CardHeader>
        <CardDescription>Incomes</CardDescription>
        <CardTitle className="text-green-500 text-xl">
          +{getIncomes()}€
        </CardTitle>
      </CardHeader>
    </Card>
  );
}
