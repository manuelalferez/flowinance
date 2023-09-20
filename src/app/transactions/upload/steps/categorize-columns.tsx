"use client";
import { TableCell, TableHead, TableRow } from "@/app/components/ui/table";
import {
  calculatePercentageWithCondition,
  getNumColumns,
  headersOrderIndexs,
  isNumberCondition,
  isValidDate,
  switchColumns,
} from "@/lib/utils";
import { useContext, useEffect, useState } from "react";
import { ColHeader } from "@/app/types/global";
import { useToast } from "@/app/components/ui/use-toast";
import { addRowToMatrix } from "../../components/operators";
import { Button } from "@/app/components/ui/button";
import { TransactionsTable } from "../../components/transactions-table";
import { UploadTransactionsContext } from "@/lib/context";
import { Alert, AlertDescription, AlertTitle } from "@/app/components/ui/alert";

const headerOptions = ["date", "concept", "amount"];

export function CategorizeColumns() {
  const { transactions, setTransactions, nextStep } = useContext(
    UploadTransactionsContext
  );

  const [transactionsCopy, setTransactionsCopy] = useState<string[][]>([]);
  const [colTitles, setColTitles] = useState<ColHeader[]>([]);

  const { toast } = useToast();

  function findColumnWithDate(): number {
    return transactions[0].findIndex((_, index) => {
      const percentage = calculatePercentageWithCondition(
        transactions,
        index,
        isValidDate
      );
      return percentage > 0.5;
    });
  }

  function findColumnWithAmount(): number {
    return transactions[0].findIndex((_, index) => {
      const percentage = calculatePercentageWithCondition(
        transactions,
        index,
        isNumberCondition
      );
      return percentage > 0.5;
    });
  }

  useEffect(() => {
    let orderSuggestion = [...headerOptions];
    setTransactionsCopy(transactions);

    const dateIndex = findColumnWithDate();
    if (dateIndex === -1) return;
    orderSuggestion = switchHeaderOrderSuggestions(
      orderSuggestion,
      headersOrderIndexs.date,
      dateIndex
    );

    const amountIndex = findColumnWithAmount();
    if (amountIndex === -1) return;
    orderSuggestion = switchHeaderOrderSuggestions(
      orderSuggestion,
      headersOrderIndexs.amount,
      amountIndex
    );

    handleNext(orderSuggestion.map((name, col) => ({ name, col })));
  }, [transactions]);

  function switchHeaderOrderSuggestions(arr: any[], a: number, b: number) {
    const copy = [...arr];
    [copy[a], copy[b]] = [copy[b], copy[a]];
    return copy;
  }

  function isHeaderChosen(headerName: string) {
    return colTitles.some((col) => col.name === headerName);
  }

  function handleSelectChange(headerName: string, column: number) {
    if (isHeaderChosen(headerName)) {
      toast({
        description: `⛔️ You have already assigned that '${headerName}' to another column.`,
      });
      return;
    }
    const columnIndex = colTitles.findIndex((col) => col.col === column);

    const updatedHeaders = [...colTitles];

    if (columnIndex === -1) {
      updatedHeaders.push({ name: headerName, col: column });
    } else {
      updatedHeaders[columnIndex] = { name: headerName, col: column };
    }

    setColTitles(updatedHeaders);
  }

  function createTableHeader(colIndex: number): JSX.Element {
    const value = colTitles.find((col) => col.col === colIndex)?.name || "";
    return (
      <TableHead key={colIndex}>
        <select
          onChange={(e) => handleSelectChange(e.target.value, colIndex)}
          value={value}
          className="w-[180px] p-2 border rounded"
        >
          <option value="" disabled selected>
            Select column
          </option>
          {headerOptions.map((item, index) => (
            <option value={item} key={index}>
              {item}
            </option>
          ))}
        </select>
      </TableHead>
    );
  }

  function getTableHeadersWithDropDown(): JSX.Element[] {
    const numCols = getNumColumns(transactionsCopy);
    const tableHeaders = [];

    for (let i = 0; i < numCols; i++) {
      const tableHeader = createTableHeader(i);
      tableHeaders.push(tableHeader);
    }

    return tableHeaders;
  }

  function getTableContents() {
    return transactionsCopy.map((row, rowIndex) => (
      <TableRow key={rowIndex}>
        {row.map((col, colIndex) => (
          <TableCell key={colIndex}>{col}</TableCell>
        ))}
      </TableRow>
    ));
  }

  function getMatrixSortedByHeaders(matrix: string[][]) {
    let sortedTransactions = [...matrix];
    const dateIndex = sortedTransactions[0].findIndex((col) => col === "date");

    if (dateIndex !== headersOrderIndexs.date) {
      sortedTransactions = switchColumns(
        sortedTransactions,
        headersOrderIndexs.date,
        dateIndex
      );
    }
    const conceptIndex = sortedTransactions[0].findIndex(
      (col) => col === "concept"
    );
    if (conceptIndex !== headersOrderIndexs.concept) {
      sortedTransactions = switchColumns(
        sortedTransactions,
        headersOrderIndexs.concept,
        conceptIndex
      );
    }
    const amountIndex = sortedTransactions[0].findIndex(
      (col) => col === "amount"
    );
    if (amountIndex !== headersOrderIndexs.amount) {
      sortedTransactions = switchColumns(
        sortedTransactions,
        headersOrderIndexs.amount,
        amountIndex
      );
    }
    return sortedTransactions;
  }

  function handleNext(headerTitles: ColHeader[] | undefined) {
    const headers = headerTitles
      ? headerTitles.map((col) => col.name)
      : colTitles.map((col) => col.name);
    const copy = headerTitles
      ? transactions.map((row) => [...row])
      : transactionsCopy.map((row) => [...row]);

    const matrixWithCategories = addRowToMatrix(copy, headers);
    const sortedMatrix = getMatrixSortedByHeaders(matrixWithCategories);

    if (
      calculatePercentageWithCondition(
        sortedMatrix,
        headersOrderIndexs.amount,
        isNumberCondition
      ) < 0.5
    ) {
      toast({
        description:
          "❎ The column 'amount' should contain numbers. Please, check the column and try again.",
      });
      restoreCategories(true);
      return;
    }
    if (
      calculatePercentageWithCondition(
        sortedMatrix,
        headersOrderIndexs.date,
        isValidDate
      ) < 0.5
    ) {
      toast({
        description:
          "❎ The column 'date' should contain dates. Please, check the column and try again.",
      });
      restoreCategories(true);
      return;
    }

    setTransactions(sortedMatrix);
    nextStep();
  }

  function restoreCategories(isError?: boolean) {
    if (isError) {
      setColTitles([]);
      return;
    }
    toast({
      description: " Default categories restored",
    });
  }

  const contents = getTableContents();
  const headers = getTableHeadersWithDropDown();

  return (
    <>
      <div>
        <Alert className="mb-2 text-2xl border-none">
          <AlertTitle>Classify columns</AlertTitle>
          <AlertDescription>
            Classify every column according to its respective category: date,
            concept, or amount.
          </AlertDescription>
        </Alert>
      </div>
      <Button
        variant="outline"
        onClick={() => restoreCategories(false)}
        className="mb-5 bg-white-200"
        disabled={colTitles.length === 0}
      >
        Restore categories
      </Button>
      <Button
        variant="outline"
        onClick={() => handleNext}
        className="mb-5 bg-emerald-200"
      >
        Next step
      </Button>
      <TransactionsTable headers={headers} contents={contents} />
    </>
  );
}
