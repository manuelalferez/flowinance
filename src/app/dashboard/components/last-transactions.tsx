import { Transaction } from "@/app/types/global";
import { TABLE_HEADERS } from "@/lib/constants";
import { AppContext } from "@/lib/context";
import { formatNumberWithTwoDecimals, sortTransactions } from "@/lib/utils";
import { useContext } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { DashboardCard } from "./ui/dashboard-card";
import { CardDescription } from "../../components/ui/card";

export function LastTransactions() {
  const { transactions, currency } = useContext(AppContext);

  const shortedTransactions = sortTransactions(transactions);
  const lastTransactions = shortedTransactions.slice(
    sortTransactions.length - 11
  );

  return (
    <DashboardCard title="Last transactions" className="p-2 md:p-8">
      <CardDescription className="mb-4">
        Here&apos;s the latest gossip from your wallet: Your 10 most recent
        moves!
      </CardDescription>

      <Table key="expenses-table" className="text-xs md:text-base">
        <TableHeader>
          <TableRow>
            {TABLE_HEADERS.map((header, index) => (
              <TableHead
                className={
                  header === "amount" ? "text-right font-bold" : "p-2 font-bold"
                }
                key={index}
              >
                {header.charAt(0).toUpperCase() + header.slice(1)}
                {currency && ""}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        {lastTransactions.map((item: Transaction, index: number) => (
          <TableBody key={index}>
            <TableRow key={index}>
              <TableCell
                className="p-2 font-mono tabular-nums text-gray-700"
                key={`${index}-date`}
              >
                {item.date}
              </TableCell>
              <TableCell className="p-2 " key={`${index}-concept`}>
                {item.concept}
              </TableCell>
              <TableCell
                className="p-2 text-right font-mono tabular-nums text-gray-700"
                key={`${index}-amount`}
              >
                {formatNumberWithTwoDecimals(item.amount)}
              </TableCell>
              <TableCell className="p-2" key={`${index}-category`}>
                {item.category}
              </TableCell>
            </TableRow>
          </TableBody>
        ))}
      </Table>
    </DashboardCard>
  );
}
