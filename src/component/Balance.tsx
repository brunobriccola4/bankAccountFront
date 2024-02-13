import { useAppSelector } from "@/redux/hooks";
import { Transactions } from "@/redux/interface";
import React from "react";
import Spinner from "./Spinner";
import { Title } from "./Title";

export const Balance = () => {
  const { balance, initialAmount, state } = useAppSelector(
    (state) => state.account
  );
  return (
    <div className="w-full lg:w-8/12 p-4 mx-auto rounded-md bg-slate-50">
      {state === "loading" && <Spinner />}
      <div className="pt-2">
        <Title title="Balance" />
      </div>
      <div className="w-full flex flex-col">
        <div className="w-full flex justify-between">
          <p className="text-sky-500">Tipo de transaccion</p>
          <p className="text-sky-500"> Monto</p>
        </div>
        {balance?.transactions.map((transaction: Transactions) => {
          return (
            <div key={transaction._id} className="flex gap-4 justify-between">
              <p className="text-slate-950">{transaction.transaction_type}</p>
              <p className="text-slate-600">${transaction.transactionAmount}</p>
            </div>
          );
        })}
        <p className="text-slate-900 text-1xl text-end pt-4 pb-4">
          Total: ${initialAmount}
        </p>
      </div>
    </div>
  );
};
