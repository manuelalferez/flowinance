import {
  getSpecialCategories,
  getTotalExpenses,
  getTotalIncomes,
} from "@/lib/calculations";
import { AppContext } from "@/lib/context";
import { formatNumberWithTwoDecimals, roundToTwoDecimal } from "@/lib/utils";
import { useContext } from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";

export function Balance() {
  const { transactions, currency } = useContext(AppContext);

  function getBalance() {
    const expenses = getTotalExpenses(transactions);
    const incomes = getTotalIncomes(transactions);
    const special = getSpecialCategories(transactions);
    const balance = incomes - expenses + special;

    return roundToTwoDecimal(balance);
  }

  return (
    <Card className="pr-14 w-1/2">
      <CardHeader>
        <CardDescription>Current balance</CardDescription>
        <CardTitle className="font-mono tabular-nums text-3xl">
          {formatNumberWithTwoDecimals(getBalance())}
          {currency}
        </CardTitle>
      </CardHeader>
    </Card>
  );
}
