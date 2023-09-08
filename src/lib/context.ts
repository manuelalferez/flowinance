import { Transaction } from "@/app/types/global";
import { createContext } from "react";

interface TransactionsContext {
  transactions: string[][];
  setTransactions: (transactions: string[][]) => void;
  nextStep: () => void;
  uploadTransactions: (matrix: string[][]) => void;
}

const defaultContext: TransactionsContext = {
  transactions: [],
  setTransactions: () => {},
  nextStep: () => {},
  uploadTransactions: () => {},
};

export const UploadTransactionsContext =
  createContext<TransactionsContext>(defaultContext);

type AppContextType = {
  transactions: Transaction[];
};

const defaultDashboardContext: AppContextType = {
  transactions: [],
};

export const AppContext = createContext<AppContextType>(
  defaultDashboardContext
);
