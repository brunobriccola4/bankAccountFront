import { Action, ThunkAction, combineReducers, configureStore } from "@reduxjs/toolkit";
import accountReducer from "./features/accountSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  account: persistReducer(persistConfig, accountReducer)
})

export const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  devTools: true,
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
