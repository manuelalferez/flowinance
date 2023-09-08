import React, { useContext, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import { Transaction } from "@/app/types/global";
import { TABLE_HEADERS } from "@/lib/constants";
import { shortTransactions } from "@/lib/utils";
import { Button } from "@/app/components/ui/button";
import { DashboardCard } from "@/app/components/dashboard/ui/dashboard-card";
import { AppContext } from "@/lib/context";

export function TransactionsTable() {
  const { transactions } = useContext(AppContext);
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 10;

  const startIndex = (currentPage - 1) * transactionsPerPage;
  const endIndex = startIndex + transactionsPerPage;

  const paginatedTransactions = shortTransactions(transactions).slice(
    startIndex,
    endIndex
  );

  return (
    <DashboardCard title="All transactions">
      <>
        <Table key="expenses-table">
          <TableHeader>
            <TableRow>
              {TABLE_HEADERS.map((header, index) => (
                <TableHead
                  className="p-2 lg:pr-44 md:pr-28"
                  key={`${index}-header`}
                >
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedTransactions.map((item: Transaction, index: number) => (
              <TableRow key={`${index}-row`}>
                <TableCell className="p-2" key={`${index}-date`}>
                  {item.date}
                </TableCell>
                <TableCell className="p-2" key={`${index}-concept`}>
                  {item.concept}
                </TableCell>
                <TableCell className="p-2" key={`${index}-amount`}>
                  {item.amount}
                </TableCell>
                <TableCell className="p-2" key={`${index}-category`}>
                  {item.category}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-4 flex justify-center">
          <Button
            className="mx-2 bg-emerald-200 text-white px-4 py-2 rounded-md"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button
            className="mx-2 bg-emerald-200 text-white px-4 py-2 rounded-md"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={endIndex >= shortTransactions(transactions).length}
          >
            Next
          </Button>
        </div>
      </>
    </DashboardCard>
  );
}
