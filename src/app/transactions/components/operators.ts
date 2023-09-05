export function removeColumn(matrix: string[][], colIndex: number): string[][] {
  const filteredMatrix = matrix.map((row) =>
    row.filter((_, index) => index !== colIndex)
  );
  return filteredMatrix;
}

export function removeRow(matrix: string[][], rowIndex: number): string[][] {
  const filteredMatrix = matrix.filter((_, index) => index !== rowIndex);
  return filteredMatrix;
}

export function addRowToMatrix(
  matrix: string[][],
  newRow: string[]
): string[][] {
  if (matrix.length === 0 || newRow.length !== matrix[0].length) {
    throw new Error("Invalid matrix dimensions");
  }

  return [newRow, ...matrix];
}

export function addColumnToMatrix(matrix: string[][], newCol: string[]) {
  if (matrix.length === 0 || newCol.length !== matrix.length) {
    throw new Error("Invalid matrix dimensions");
  }

  return matrix.map((row, index) => [...row, newCol[index]]);
}
