import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import accountReducer from "./features/accountSlice";


export const store = configureStore({
  reducer: { accountReducer },
  devTools: true
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;