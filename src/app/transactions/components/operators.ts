export function removeColumn(matrix: string[][], colIndex: number): string[][] {
  const filteredMatrix = matrix.map((row) =>
    row.filter((_, index) => index !== colIndex)
  );
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
