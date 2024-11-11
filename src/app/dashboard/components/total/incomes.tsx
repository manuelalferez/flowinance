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
    <Card className="w-full">
      <CardHeader>
        <CardDescription className="flex items-center flex-wrap gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="bg-emerald-50 p-1 rounded-md w-7 h-7"
          >
            <path
              fill="currentColor"
              d="M2.7 17.625q-.3-.3-.288-.712t.288-.688l5.275-5.35Q8.55 10.3 9.4 10.3t1.425.575l2.575 2.6l5.2-5.15H17q-.425 0-.712-.288T16 7.326t.288-.712t.712-.288h4q.425 0 .713.288t.287.712v4q0 .425-.288.713t-.712.287t-.712-.287t-.288-.713v-1.6L14.825 14.9q-.575.575-1.425.575t-1.425-.575L9.4 12.325l-5.3 5.3q-.275.275-.7.275t-.7-.275"
            />
          </svg>
          <span>Incomes</span>
        </CardDescription>
        <CardTitle className="text-green-500 text-lg md:text-xl font-mono tabular-nums">
          {incomes !== 0 && "+"}
          {currency}
          {formatNumberWithTwoDecimals(incomes)}
        </CardTitle>
      </CardHeader>
    </Card>
  );
}
