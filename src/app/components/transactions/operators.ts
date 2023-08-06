import { TransactionsMatrix } from "@/lib/utils";
import { SelectedCol } from "./types";

export function removeUnselectedColumns(
  selectedCols: SelectedCol[],
  matrix: TransactionsMatrix
) {
  const columnsToKeep = selectedCols.map((col) => col.col);

  const filteredMatrix = matrix.transactions.map((row) =>
    row.filter((_, colIndex: number) => columnsToKeep.includes(colIndex))
  );
  return { transactions: filteredMatrix };
}
