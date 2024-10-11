import {
  getInvested,
  getSavings,
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
import { useMemo } from "react";

export function Balance() {
  const { transactions, currency } = useContext(AppContext);

  const balance = useMemo(() => {
    const expenses = getTotalExpenses(transactions);
    const incomes = getTotalIncomes(transactions);
    const special = getInvested(transactions) + getSavings(transactions);
    const uncategorized = getSpecialCategories(transactions) - special;
    const balance = incomes - expenses - special + uncategorized;

    return roundToTwoDecimal(balance);
  }, [transactions]);

  return (
    <Card className="w-full md:w-1/3">
      <CardHeader>
        <CardDescription className="flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="bg-gray-50 p-1 rounded-md w-7 h-7"
          >
            <path
              fill="currentColor"
              d="M16 13.5q.65 0 1.075-.425T17.5 12q0-.65-.425-1.075T16 10.5q-.65 0-1.075.425T14.5 12q0 .65.425 1.075T16 13.5ZM5 19V5v14Zm0 2q-.825 0-1.413-.588T3 19V5q0-.825.588-1.413T5 3h14q.825 0 1.413.588T21 5v2.5h-2V5H5v14h14v-2.5h2V19q0 .825-.588 1.413T19 21H5Zm8-4q-.825 0-1.413-.588T11 15V9q0-.825.588-1.413T13 7h7q.825 0 1.413.588T22 9v6q0 .825-.588 1.413T20 17h-7Zm7-2V9h-7v6h7Z"
            />
          </svg>
          Current balance
        </CardDescription>
        <CardTitle className="font-mono tabular-nums text-2xl md:text-3xl">
          {balance < 0 ? (
            <>
              <span className="text-red-500">
                -{currency}
                {formatNumberWithTwoDecimals(Math.abs(balance))}
              </span>
            </>
          ) : (
            <>
              <span className="text-green-500">
                +{currency}
                {formatNumberWithTwoDecimals(balance)}
              </span>
            </>
          )}
        </CardTitle>
        <div className="flex flex-col w-fit bg-gray-50 p-2 rounded-md">
          <CardDescription className="flex gap-1">
            Invested:
            <span className="font-mono tabular-nums text-sm flex gap-1">
              {currency}
              {formatNumberWithTwoDecimals(getInvested(transactions))}
            </span>
          </CardDescription>
        </div>
      </CardHeader>
    </Card>
  );
}
