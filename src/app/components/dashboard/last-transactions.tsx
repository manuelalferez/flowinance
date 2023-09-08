import { Transaction } from "@/app/types/global";
import { DashboardContext } from "@/lib/context";
import { shortTransactions } from "@/lib/utils";
import { useContext } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { DashboardCard } from "./ui/dashboard-card";

const headers = ["date", "concept", "amount", "category"];

export function LastTransactions() {
  const { transactions } = useContext(DashboardContext);

  const shortedTransactions = shortTransactions(transactions);
  const lastTransactions = shortedTransactions.slice(0, 10);

  return (
    <DashboardCard title="Last transactions">
      <Table key="expenses-table">
        <TableHeader>
          <TableRow>
            {headers.map((header, index) => (
              <TableHead className="p-2 lg:pr-44 md:pr-28" key={index}>
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        {lastTransactions.map((item: Transaction, index: number) => (
          <TableBody key={index}>
            <TableRow key={index}>
              <TableCell className="p-2" key={index}>
                {item.date}
              </TableCell>
              <TableCell className="p-2" key={index}>
                {item.concept}
              </TableCell>
              <TableCell className="p-2" key={index}>
                {item.amount}
              </TableCell>
              <TableCell className="p-2" key={index}>
                {item.category}
              </TableCell>
            </TableRow>
          </TableBody>
        ))}
      </Table>
    </DashboardCard>
  );
}
