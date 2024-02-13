import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AccountState, Transactions } from "../interface";

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

export const newTransaction = createAsyncThunk(
  "transactions",
  async (transaction: Transactions) => {
    try {
      if (!transaction) {
        throw new Error("No hay datos para realizar la transaccion");
      }
      const response = await axios.post(
        "http://localhost:3001/transactions",
        transaction
      );
      console.log("response", response);
      return response?.data;
    } catch (error) {
      console.log("error", error);
      throw new Error("No se pudo realizar la transaccion");
    }
  }
);

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createAccount.pending, (state) => {
      state.state = "loading";
    });
    builder.addCase(createAccount.fulfilled, (state, action) => {
      return (state = {
        state: action.payload?.status,
        id: action.payload?.id,
      });
    });
    builder.addCase(createAccount.rejected, (state, action) => {
      (state.state = "failed"), (state.error = action.error.message);
    });
    builder.addCase(fetchAccountById.pending, (state, action) => {
      state.state = "loading";
    });
    builder.addCase(fetchAccountById.rejected, (state, action) => {
      (state.state = "failed"), (state.error = action.error.message);
    });
    builder.addCase(fetchAccountById.fulfilled, (state, action) => {
      const { data } = action.payload;
      return (state = {
        state: action.payload.status,
        name: data?.account.name,
        id: action.payload.data?.account?._id,
        account_number: action.payload.data.account.account_number,
        balance: action.payload.data.balance,
        initialAmount: action.payload.data.account.initialAmount,
      });
    });
    builder.addCase(newTransaction.pending, (state) => {
      state.state = "loading";
    });
    builder.addCase(newTransaction.rejected, (state, action) => {
      (state.state = "failed"), (state.error = action.error.message);
    });
    builder.addCase(newTransaction.fulfilled, (state, action) => {
      state.state = "ok";
    });
  },
});

export default accountSlice.reducer;
