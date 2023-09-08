export interface Transaction {
  date: string;
  concept: string;
  amount: number;
  category: string;
  user_id: string;
  id?: string;
  created_at?: string;
}

export interface ColHeader {
  name: string;
  col: number;
}

export interface TransactionSupabase {
  date: string;
  concept: string;
  amount: string;
  category: string;
  user_id: string;
  id?: string;
  created_at?: string;
}
