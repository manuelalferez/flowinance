import { Transaction } from "@/app/types/global";
import { createContext } from "react";

interface TransactionsContext {
  transactions: string[][];
  setTransactions: (transactions: string[][]) => void;
  nextStep: () => void;
  uploadTransactions: (matrix: string[][]) => void;
  setLoading?: (loading: boolean) => void;
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
  filteredTransactions?: Transaction[];
  selected?: number;
  setSelected?: (selected: number) => void;
  currency?: string;
};

const defaultDashboardContext: AppContextType = {
  transactions: [],
  filteredTransactions: [],
  selected: 1,
  setSelected: () => {},
};

export const AppContext = createContext<AppContextType>(
  defaultDashboardContext
);
