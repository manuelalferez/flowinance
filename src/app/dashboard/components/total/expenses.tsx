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
    <Card className="w-1/3">
      <CardHeader>
        <CardDescription className="flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 256 256"
            className="bg-red-100 p-1 rounded-md w-6 h-6"
          >
            <path
              fill="currentColor"
              d="M236 208a12 12 0 0 1-12 12H32a12 12 0 0 1-12-12V48a12 12 0 0 1 24 0v11l52 52l23.51-23.52a12 12 0 0 1 17 0L188 139v-11a12 12 0 0 1 24 0v40q0 .6-.06 1.2c0 .16-.05.33-.07.49s-.06.45-.1.67s-.09.38-.14.56s-.09.39-.15.58l-.19.54c-.07.19-.13.38-.21.56s-.15.34-.23.5s-.17.38-.27.57s-.18.3-.27.45s-.21.38-.33.56s-.24.32-.36.47s-.22.32-.34.47s-.46.53-.71.78l-.08.1l-.1.08c-.25.25-.51.48-.78.71l-.46.34c-.16.12-.32.25-.48.36s-.37.22-.55.33s-.3.19-.46.27s-.37.18-.56.27s-.33.16-.51.23l-.54.21l-.57.19a4.92 4.92 0 0 1-.55.14l-.58.15l-.64.09l-.53.08a11.51 11.51 0 0 1-1.18.05h-40a12 12 0 0 1 0-24h11l-43-43l-23.51 23.52a12 12 0 0 1-17 0L44 93v103h180a12 12 0 0 1 12 12Z"
            />
          </svg>
          Expenses
        </CardDescription>
        <CardTitle className="text-red-500 text-lg md:text-xl font-mono tabular-nums">
          {expenses !== 0 && "-"}
          {currency}
          {formatNumberWithTwoDecimals(expenses)}
        </CardTitle>
      </CardHeader>
    </Card>
  );
}
