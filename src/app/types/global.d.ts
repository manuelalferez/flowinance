export interface Transaction {
  id: string;
  date: string;
  concept: string;
  amount: number;
  category: string;
}

export interface ColHeader {
  name: string;
  col: number;
}
