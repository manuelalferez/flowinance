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
import {
  deleteTransactionFromSupabase,
  isExpense,
  sortTransactionsTable,
} from "@/lib/utils";
import { Button } from "@/app/components/ui/button";
import { AppContext } from "@/lib/context";
import { Card, CardTitle } from "@/app/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { useSupabase } from "@/app/supabase-provider";
import { categorySVGs } from "@/lib/categories";
import Link from "next/link";

export function TransactionsTable() {
  const { transactions } = useContext(AppContext);
  const { supabase } = useSupabase();
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionsCopy, setTransactionsCopy] = useState<Transaction[]>(
    sortTransactionsTable(transactions)
  );
  const [open, setOpen] = useState(false);
  const [transactionToDeleteId, setTransactionToDeleteId] =
    useState<string>("");
  const [rowToDelete, setRowToDelete] = useState<number>(0);
  const transactionsPerPage = 10;

  function deleteTransactionFromTable() {
    const copy = [...transactionsCopy];
    copy.splice(rowToDelete, 1);
    setTransactionsCopy(copy);
  }

  const startIndex = (currentPage - 1) * transactionsPerPage;
  const endIndex = startIndex + transactionsPerPage;

  const paginatedTransactions = transactionsCopy.slice(startIndex, endIndex);

  function targetTransactionToDelete(id: string, index: number) {
    setOpen(true);
    setTransactionToDeleteId(id);
    setRowToDelete(index + (currentPage - 1) * transactionsPerPage);
  }

  async function deleteTransaction() {
    await deleteTransactionFromSupabase(supabase, transactionToDeleteId);
    setOpen(false);
    deleteTransactionFromTable();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <CardTitle className="mb-6 flex justify-center">
        All transactions
      </CardTitle>
      <Card className="p-2">
        <Table key="expenses-table" className="text-xs md:text-base">
          <TableHeader>
            <TableRow>
              {TABLE_HEADERS.map((header, index) => (
                <TableHead
                  className={
                    header === "amount"
                      ? "text-right p-2 font-bold"
                      : "p-2 font-bold"
                  }
                  key={`${index}-header`}
                >
                  {header.charAt(0).toUpperCase() + header.slice(1)}
                </TableHead>
              ))}
              <TableHead key={`options-header`}>
                <span className="w-20 p-2 pr-4"></span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedTransactions.map((item: Transaction, index: number) => (
              <TableRow key={`${index}-row`}>
                <TableCell
                  className="p-2 font-mono tabular-nums text-gray-700"
                  key={`${index}-date`}
                >
                  {item.date}
                </TableCell>
                <TableCell className="p-2" key={`${index}-concept`}>
                  {item.concept}
                </TableCell>
                <TableCell
                  className="p-2 text-right font-mono tabular-nums text-gray-700"
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
                    {item.amount}
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
                <div className="hidden hoverable-cell-flex gap-2 pr-1">
                  <TableCell
                    className="p-2 hidden hoverable-cell"
                    key={`${index}-update`}
                  >
                    <Link
                      href={{
                        pathname: "/transactions/update",
                        query: { id: item.id! },
                      }}
                      passHref
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        className="stroke-current text-current cursor-pointer hover:text-gray-500 transition-colors duration-200 w-4 md:w-8" // Pointer cursor and hover effect
                      >
                        <path
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 20h4L18.5 9.5a2.828 2.828 0 1 0-4-4L4 16zm9.5-13.5l4 4"
                        />
                      </svg>
                    </Link>
                  </TableCell>
                  <TableCell
                    className="p-2 w-2 hidden hoverable-cell"
                    key={`${index}-options`}
                  >
                    <DialogTrigger
                      className="p-0 flex justify-center items-center"
                      onClick={() => targetTransactionToDelete(item.id!, index)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        className="stroke-current text-current cursor-pointer hover:text-gray-500 transition-colors duration-200 w-4 md:w-8" // Pointer cursor and hover effect
                      >
                        <path
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 7h16m-10 4v6m4-6v6M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"
                        />
                      </svg>
                    </DialogTrigger>
                  </TableCell>
                </div>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <div className="mt-4 flex justify-center items-center ">
        <Button
          className="mx-2 px-4 py-2 rounded-md"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span className="p-2">
          {currentPage} of{" "}
          {Math.ceil(transactionsCopy.length / transactionsPerPage)}
        </span>
        <Button
          className="mx-2 px-4 py-2 rounded-md"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={endIndex >= transactions.length}
        >
          Next
        </Button>
      </div>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete this
            transaction.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-center">
          <Button variant="destructive" onClick={() => deleteTransaction()}>
            Yes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
