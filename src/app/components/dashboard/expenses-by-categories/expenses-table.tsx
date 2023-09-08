import { EXPENSES_CATEGORIES } from "@/lib/categories";
import { DashboardContext } from "@/lib/context";
import { roundToTwoDecimal } from "@/lib/utils";
import { useContext } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { DashboardCard } from "../dashboard-card";

type ExpenseCategory = {
  name: string;
  value: number;
};

export function ExpensesTable() {
  const { transactions } = useContext(DashboardContext);

  const expenses = transactions.filter((transaction) => {
    return EXPENSES_CATEGORIES.some(
      (category) => category === transaction.category
    );
  });
  const categoriesWithTotalExpenses = EXPENSES_CATEGORIES.map((category) => {
    const totalForCategory = expenses.reduce((acc, curr) => {
      if (curr.category === category) {
        return acc + curr.amount;
      }
      return acc;
    }, 0);

    if (totalForCategory === 0) {
      return null;
    }
    const totalForCategoryRounded = roundToTwoDecimal(totalForCategory);
    return {
      name: category,
      value: totalForCategoryRounded,
    };
  }).filter((item): item is ExpenseCategory => item !== null);

  return (
    <DashboardCard title="Expenses by categories">
      <Table key="expenses-table">
        <TableHeader>
          <TableRow>
            <TableHead className="p-2">Category</TableHead>
            <TableHead className="p-2 pl-8">Amount</TableHead>
          </TableRow>
        </TableHeader>
        {categoriesWithTotalExpenses.map(
          (item: ExpenseCategory, index: number) => (
            <TableBody key={index}>
              <TableRow key={index}>
                <TableCell className="p-2" key={index}>
                  {item.name}
                </TableCell>
                <TableCell className="p-2 pl-8">{item.value}€</TableCell>
              </TableRow>
            </TableBody>
          )
        )}
      </Table>
    </DashboardCard>
  );
}
