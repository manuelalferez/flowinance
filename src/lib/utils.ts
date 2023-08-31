import { Transaction } from "@/app/types/global";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { SpecialCategories } from "./categories";

const DELIMITER = ";";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function createTransaction(
  date: string,
  concept: string,
  amount: string
): Transaction {
  return {
    id: new Date().valueOf().toString(),
    date,
    concept,
    amount: parseFloat(amount),
    category: SpecialCategories.Uncategorized,
  };
}

export function getNumColumns(matrix: string[][]) {
  if (matrix.length === 0) {
    return 0;
  }

  return matrix[0].length;
}

function hasEmptyStringExceptFirst(arr: string[]): boolean {
  return arr.slice(1).some((item) => item === "");
}

export function extractFields(lines: string[]): string[][] {
  let fields: string[][] = [];

  lines.forEach((line) => {
    const splittedLine = line.split(DELIMITER);
    if (!hasEmptyStringExceptFirst(splittedLine)) {
      fields.push(splittedLine);
    }
  });
  return fields;
}
