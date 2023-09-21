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
import { deleteTransactionFromSupabase, sortTransactions } from "@/lib/utils";
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

export function TransactionsTable() {
  const { transactions } = useContext(AppContext);
  const { supabase } = useSupabase();
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionsCopy, setTransactionsCopy] =
    useState<Transaction[]>(transactions);
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

  const paginatedTransactions = sortTransactions(transactionsCopy).slice(
    startIndex,
    endIndex
  );

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
                  className="p-2 lg:pr-44 md:pr-28"
                  key={`${index}-header`}
                >
                  {header}
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

      <div className="mt-4 flex justify-center">
        <Button
          className="mx-2 px-4 py-2 rounded-md"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <Button
          className="mx-2 px-4 py-2 rounded-md"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={endIndex >= sortTransactions(transactions).length}
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
