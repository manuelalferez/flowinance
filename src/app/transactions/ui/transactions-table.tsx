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
import { EXPENSES_CATEGORIES, categorySVGs } from "@/lib/categories";

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

  function isExpense(category: string) {
    return EXPENSES_CATEGORIES.some((expense) => expense === category);
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
              <TableHead
                className="p-2 w-2 pr-8"
                key={`options-header`}
              ></TableHead>
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
                  <span className="flex items-center">
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
                <TableCell
                  className="p-2 w-2 cursor-pointer hidden hoverable-cell"
                  key={`${index}-options`}
                >
                  <DialogTrigger
                    className="p-0 flex justify-center items-center"
                    onClick={() => targetTransactionToDelete(item.id!, index)}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4L3.5 4C3.22386 4 3 3.77614 3 3.5ZM5 4H10V12H5V4Z"
                        fill="currentColor"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </DialogTrigger>
                </TableCell>
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
