export type Transactions = {
  _id?: string;
  account_id: string;
  transactionAmount: number;
  transaction_type: string;
};

export type Balance = {
  _id: string;
  account_number: number;
  transactions: Transactions[];
  total: number;
};

export type AccountState = {
  name?: string;
  account_number?: number;
  initialAmount?: number;
  id?: string;
  state: "booting" | "idle" | "loading" | "failed" | "ok";
  balance?: Balance;
  error?: string;
};
