import { INCOMES_CATEGORIES } from "@/lib/categories";
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
import { getTotalIncomes } from "@/lib/calculations";

type IncomeCategory = {
  name: string;
  value: number;
};

export function IncomesTable() {
  const { filteredTransactions, currency } = useContext(AppContext);

  const categoriesWithTotalExpenses = INCOMES_CATEGORIES.map((category) => {
    const totalForCategory = filteredTransactions!
      .filter((transaction) => transaction.category === category)
      .reduce((acc, curr) => acc + curr.amount, 0);

    const totalForCategoryRounded = roundToTwoDecimal(totalForCategory);

    return totalForCategoryRounded !== 0
      ? { name: category, value: totalForCategoryRounded }
      : null;
  })
    .filter((item): item is IncomeCategory => item !== null)
    .sort((a, b) => b.value - a.value);

  function getIncomes() {
    const incomes = getTotalIncomes(filteredTransactions!);
    return roundToTwoDecimal(incomes);
  }
  const totalIncomes = getIncomes();

  return categoriesWithTotalExpenses.length !== 0 ? (
    <DashboardCard
      title="Incomes by categories"
      description="Explore a detailed breakdown of your incomes in the table below,
    conveniently organized for easy reference and understanding."
    >
      <Table key="incomes-table">
        <TableHeader>
          <TableRow className="font-bold">
            <TableHead className="p-2">Category</TableHead>
            <TableHead className="p-2 pl-8 text-right">
              Amount({currency})
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody key="body-incomes">
          {categoriesWithTotalExpenses.map(
            (item: IncomeCategory, index: number) => (
              <TableRow key={index} className="border-none">
                <TableCell className="p-2">{item.name}</TableCell>
                <TableCell className="p-2 pl-8 text-right font-mono tabular-nums text-gray-700">
                  {formatNumberWithTwoDecimals(item.value)}
                </TableCell>
              </TableRow>
            )
          )}
          <TableRow key="total-incomes" className="bg-gray-50">
            <TableCell className="p-2 font-bold border-t-2">Total</TableCell>
            <TableCell className="p-2 pl-8 text-right border-t-2 font-mono tabular-nums text-gray-700 font-bold">
              {formatNumberWithTwoDecimals(totalIncomes)}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </DashboardCard>
  ) : (
    <DashboardNoDataCard
      title="Incomes by categories"
      description="You have not generated any income so far."
      className="w-full"
    />
  );
}
