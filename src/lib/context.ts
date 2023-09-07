import { TransactionSupabase } from "@/app/types/global";
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

type DashboardContextType = {
  transactions: TransactionSupabase[];
};

const defaultDashboardContext: DashboardContextType = {
  transactions: [],
};

export const DashboardContext = createContext<DashboardContextType>(
  defaultDashboardContext
);
