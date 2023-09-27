import { EXPENSES_CATEGORIES } from "@/lib/categories";
import { AppContext } from "@/lib/context";
import { formatNumberWithTwoDecimals, roundToTwoDecimal } from "@/lib/utils";
import { useContext } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { DashboardCard } from "../ui/dashboard-card";
import { DashboardNoDataCard } from "../ui/dashboard-no-data-card";
import { getTotalExpenses } from "@/lib/calculations";

type ExpenseCategory = {
  name: string;
  value: number;
};

export function ExpensesTable() {
  const { filteredTransactions, currency } = useContext(AppContext);

  const categoriesWithTotalExpenses = EXPENSES_CATEGORIES.map((category) => {
    const totalForCategory = filteredTransactions!
      .filter((transaction) => transaction.category === category)
      .reduce((acc, curr) => acc + curr.amount, 0);

    const totalForCategoryRounded = roundToTwoDecimal(totalForCategory);

    return totalForCategoryRounded !== 0
      ? { name: category, value: totalForCategoryRounded }
      : null;
  })
    .filter((item): item is ExpenseCategory => item !== null)
    .sort((a, b) => b.value - a.value);

  function getExpenses() {
    const expenses = getTotalExpenses(filteredTransactions!);
    return roundToTwoDecimal(expenses);
  }

  const totalExpenses = getExpenses();

  return categoriesWithTotalExpenses.length !== 0 ? (
    <DashboardCard
      title="Expenses by categories"
      description="Explore a detailed breakdown of your expenses in the table
    below, conveniently organized for easy reference and
    understanding."
    >
      <Table key="expenses-table">
        <TableHeader>
          <TableRow className="font-bold">
            <TableHead className="p-2">Category</TableHead>
            <TableHead className="p-2 pl-8 text-right">
              Amount({currency})
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody key="expenses-body">
          {categoriesWithTotalExpenses.map(
            (item: ExpenseCategory, index: number) => (
              <TableRow key={index} className="border-none">
                <TableCell className="p-2" key={index}>
                  {item.name}
                </TableCell>
                <TableCell className="p-2 pl-8 text-right font-mono tabular-nums text-gray-700">
                  {formatNumberWithTwoDecimals(item.value)}
                </TableCell>
              </TableRow>
            )
          )}
          <TableRow
            key="total"
            className="border-t-2 border-gray-800 bg-gray-50"
          >
            <TableCell className="p-2 font-bold border-t-2" key="total-name">
              Total
            </TableCell>
            <TableCell className="p-2 pl-8 border-t-2 text-right font-mono tabular-nums text-gray-700 font-bold">
              {formatNumberWithTwoDecimals(totalExpenses)}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </DashboardCard>
  ) : (
    <DashboardNoDataCard
      title="Expenses by categories"
      description="You have not generated any expense so far."
    />
  );
}
