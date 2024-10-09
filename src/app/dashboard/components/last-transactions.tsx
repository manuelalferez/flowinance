import { Transaction } from "@/app/types/global";
import { TABLE_HEADERS } from "@/lib/constants";
import { AppContext } from "@/lib/context";
import {
  formatNumberWithTwoDecimals,
  isExpense,
  sortTransactionsTable,
} from "@/lib/utils";
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
import { categorySVGs } from "@/lib/categories";

export function LastTransactions() {
  const { transactions, currency } = useContext(AppContext);

  const shortedTransactions = sortTransactionsTable(transactions);
  const lastTransactions = shortedTransactions.slice(0, 10);

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
                className="p-2 font-mono tabular-nums text-gray-700 dark:text-gray-200"
                key={`${index}-date`}
              >
                {item.date}
              </TableCell>
              <TableCell className="p-2 " key={`${index}-concept`}>
                {item.concept}
              </TableCell>
              <TableCell
                className="p-2 text-right font-mono tabular-nums text-gray-700  dark:text-gray-200"
                key={`${index}-amount`}
              >
                <span className="flex items-center justify-end">
                  {isExpense(item.category) ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="w-5 h-5 text-red-500 mr-1"
                    >
                      <path
                        fill="currentColor"
                        d="M11 14.175V7q0-.425.288-.713T12 6q.425 0 .713.288T13 7v7.175l2.9-2.875q.275-.275.688-.288t.712.288q.275.275.275.7t-.275.7l-4.6 4.6q-.3.3-.7.3t-.7-.3l-4.6-4.6q-.275-.275-.288-.687T6.7 11.3q.275-.275.7-.275t.7.275l2.9 2.875Z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="w-5 h-5 text-green-500 mr-1"
                    >
                      <path
                        fill="currentColor"
                        d="M11 9.825L8.1 12.7q-.275.275-.688.288T6.7 12.7q-.275-.275-.275-.7t.275-.7l4.6-4.6q.3-.3.7-.3t.7.3l4.6 4.6q.275.275.288.688t-.288.712q-.275.275-.7.275t-.7-.275L13 9.825V17q0 .425-.288.713T12 18q-.425 0-.713-.288T11 17V9.825Z"
                      />
                    </svg>
                  )}
                  {isExpense(item.category) ? "-" : "+"}
                  {formatNumberWithTwoDecimals(item.amount)}
                </span>
              </TableCell>
              <TableCell className="p-2" key={`${index}-category`}>
                <div className="flex gap-1 items-center">
                  <div
                    className="w-6 h-6 text-gray-500 bg-emerald-50 rounded-md p-1"
                    dangerouslySetInnerHTML={{
                      __html:
                        categorySVGs[
                          item.category as keyof typeof categorySVGs
                        ],
                    }}
                  />
                  {item.category}
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        ))}
      </Table>
    </DashboardCard>
  );
}
