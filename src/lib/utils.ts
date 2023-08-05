import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Transaction } from "@/app/components/transactions";
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

export function extractFields(lines: string[]) {
  let transactions: Transaction[] = [];
  for (let i = 1; i < lines.length; i++) {
    const [, , date, concept, , amount] = lines[i].split(DELIMITER);
    if (date && concept && amount) {
      const newTransaction = createTransaction(date, concept, amount);
      transactions.push(newTransaction);
    }
  }
  transactions.forEach((element) => {
    console.log(element);
  });
}
