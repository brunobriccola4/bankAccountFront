import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export type Transactions = {
  _id: string;
  account_id: string;
  transactionAmount: number;
  transaction_type: string;
};

export type Balance = {
  _id: string;
  account_number: number;
  transactions: Transactions[],
  total: number
};

export type AccountState = {
  name?: string;
  account_number?: number;
  initialAmount?: number;
  id?: number;
  state: "booting" | "idle" | "loading" | "failed" | "ok";
  balance?: Balance
};

const initialState: AccountState = {
  state: "booting",
};

export const createAccount = createAsyncThunk(
  "account/create",
  async (account: AccountState) => {
    try {
      if (!account) {
        throw new Error("No hay data para crear la cuenta");
      }
      const result = await axios.post(
        "http://localhost:3001/accounts",
        account
      );
      console.log("result", result);
      return result?.data;
    } catch (error) {
      console.log("error", error);
      throw new Error("Error al crear la cuenta");
    }
  }
);

export const fetchAccountById = createAsyncThunk(
  "account/fetchByIdStatus/balance",
  async (accountId: string) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/accounts/${accountId}/balance`
      );
      console.log("get by id", response);
      return response?.data;
    } catch (error) {
      console.log("error", error);
      throw new Error("No se encontro el balance");
    }
  }
);

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createAccount.fulfilled, (state, action) => {
      return (state = {
        state: action.payload?.status,
        id: action.payload?.id,
      });
    });
    builder.addCase(fetchAccountById.fulfilled, (state, action) => {
      const { data } = action.payload
      return (state = {
        state: action.payload.status,
        name: data?.account.name,
        id: action.payload.data?.account?._id,
        account_number: action.payload.data.account.account_number ,
        balance: action.payload.data.balance,
        initialAmount: action.payload.data.account.initialAmount
      });
    });
  },
});

// export const { create } = accountSlice.actions;

export default accountSlice.reducer;
