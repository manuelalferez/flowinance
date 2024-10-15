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
    <Card className="w-1/3">
      <CardHeader>
        <CardDescription className="flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 256 256"
            className="bg-emerald-100 p-1 rounded-md w-6 h-6"
          >
            <path
              fill="currentColor"
              d="M236 208a12 12 0 0 1-12 12H32a12 12 0 0 1-12-12V48a12 12 0 0 1 24 0v99l43.51-43.52a12 12 0 0 1 17 0L128 127l43-43h-11a12 12 0 0 1 0-24h40a12 12 0 0 1 12 12v40a12 12 0 0 1-24 0v-11l-51.51 51.52a12 12 0 0 1-17 0L96 129l-52 52v15h180a12 12 0 0 1 12 12Z"
            />
          </svg>{" "}
          Incomes
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
