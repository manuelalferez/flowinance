import { Transaction } from "@/app/types/global";
import {
  ESPECIAL_CATEGORIES,
  EXPENSES_CATEGORIES,
  INCOMES_CATEGORIES,
  SpecialCategories,
} from "./categories";

export function getTotalExpenses(transactions: Transaction[]) {
  return transactions.reduce((acc, curr) => {
    if (EXPENSES_CATEGORIES.some((category) => category === curr.category)) {
      return acc + curr.amount;
    }
    return acc;
  }, 0);
}

export function getTotalIncomes(transactions: Transaction[]) {
  return transactions.reduce((acc, curr) => {
    if (INCOMES_CATEGORIES.some((category) => category === curr.category)) {
      return acc + curr.amount;
    }
    return acc;
  }, 0);
}

export function getSpecialCategories(transactions: Transaction[]) {
  return transactions.reduce((acc, curr) => {
    if (ESPECIAL_CATEGORIES.some((category) => category === curr.category)) {
      return acc + curr.amount;
    }
    return acc;
  }, 0);
}

export function getSavings(transactions: Transaction[]) {
  return transactions.reduce((acc, curr) => {
    if (curr.category === SpecialCategories.Savings) {
      return acc + curr.amount;
    }
    return acc;
  }, 0);
}

export function getInvested(transactions: Transaction[]) {
  return transactions.reduce((acc, curr) => {
    if (curr.category === SpecialCategories.Investing) {
      return acc + curr.amount;
    }
    return acc;
  }, 0);
}
