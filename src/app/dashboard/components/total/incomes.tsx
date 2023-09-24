import { getTotalIncomes } from "@/lib/calculations";
import { AppContext } from "@/lib/context";
import { formatNumberWithTwoDecimals, roundToTwoDecimal } from "@/lib/utils";
import { useContext } from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";

export function Incomes() {
  const { filteredTransactions, currency } = useContext(AppContext);

  function getIncomes() {
    const incomes = getTotalIncomes(filteredTransactions!);
    return roundToTwoDecimal(incomes);
  }
  const incomes = getIncomes();
  return (
    <Card className="pr-6 w-1/2">
      <CardHeader>
        <CardDescription>Incomes</CardDescription>
        <CardTitle className="text-green-500 text-2xl font-mono tabular-nums">
          {incomes !== 0 && "+"}
          {formatNumberWithTwoDecimals(incomes)}
          {currency}
        </CardTitle>
      </CardHeader>
    </Card>
  );
}
