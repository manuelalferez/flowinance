import { TransactionsMatrix } from "@/lib/utils";
import { SelectedCol } from "./types";

export function removeUnselectedColumns(
  selectedCols: SelectedCol[],
  matrix: TransactionsMatrix
) {
  // Create an array of column indices to keep
  const columnsToKeep = selectedCols.map((col) => col.col);

  // Filter the matrix to keep only the selected columns
  const filteredMatrix = matrix.transactions.map((row) =>
    row.filter((_, colIndex: number) => columnsToKeep.includes(colIndex))
  );
  return { transactions: filteredMatrix };
}
