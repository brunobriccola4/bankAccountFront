import { AccountState } from "@/redux/interface";
import React from "react";

export const Balance = ({balance, initialAmount}: AccountState) => {
  return (
    <div className="w-full lg:w-8/12 p-4 mx-auto rounded-md bg-slate-50">
      <div className="pt-2">
        <h4 className=" text-2xl font-extrabold leading-none tracking-tight text-sky-700 md:text-3xl text-center">
          Balance
        </h4>
      </div>
      <div className="w-full flex flex-col">
        <div className="w-full flex justify-between">
          <p className="text-sky-500">Tipo de transaccion</p>
          <p className="text-sky-500"> Monto</p>
        </div>
        {balance?.transactions.map((transaction) => {
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
