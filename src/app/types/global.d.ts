export interface Transaction {
  id: string;
  date: string;
  concept: string;
  amount: number;
  category: string;
}

export interface TransactionsMatrix {
  transactions: string[][];
}

export interface SelectedCol {
  content: string;
  col: number;
}
