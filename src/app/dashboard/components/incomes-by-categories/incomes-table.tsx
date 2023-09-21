import { INCOMES_CATEGORIES } from "@/lib/categories";
import { AppContext } from "@/lib/context";
import { roundToTwoDecimal } from "@/lib/utils";
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

  return categoriesWithTotalExpenses.length !== 0 ? (
    <DashboardCard
      title="Incomes by categories"
      description="Explore a detailed breakdown of your incomes in the table below,
    conveniently organized for easy reference and understanding."
    >
      <Table key="incomes-table">
        <TableHeader>
          <TableRow>
            <TableHead className="p-2">Category</TableHead>
            <TableHead className="p-2 pl-8">Amount</TableHead>
          </TableRow>
        </TableHeader>
        {categoriesWithTotalExpenses.map(
          (item: IncomeCategory, index: number) => (
            <TableBody key={index}>
              <TableRow key={index}>
                <TableCell className="p-2">{item.name}</TableCell>
                <TableCell className="p-2 pl-8">
                  {item.value}
                  {currency}
                </TableCell>
              </TableRow>
            </TableBody>
          )
        )}
      </Table>
    </DashboardCard>
  ) : (
    <DashboardNoDataCard
      title="Incomes by categories"
      description="You have not generated any income so far."
    />
  );
}
