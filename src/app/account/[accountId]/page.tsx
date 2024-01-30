"use client";
import { fetchAccountById } from "@/redux/features/accountSlice";
import { useAppSelector } from "@/redux/hooks";
import { store } from "@/redux/store";

import React, { useEffect } from "react";

const accountIdPage = ({ params }: { params: { accountId: string } }) => {
  console.log("params", params.accountId);
  const { account_number, name, balance, initialAmount } =
    useAppSelector((state) => state.accountReducer);
  //   const dispatch = useAppDispatch();

  useEffect(() => {
    if (!params.accountId) {
      return;
    }
    store.dispatch(fetchAccountById(params.accountId));
  }, [params.accountId]);


  return (
    <section className=" py-1 bg-blueGray-50 ">
      <div className="w-full lg:w-8/12 px-4 mx-auto mt-6 bg-slate-50 rounded-md">
        <h2 className="text-zinc-950"> Detail Account</h2>
        <div className="w-80 bg-slate-500">
          <h6> Nombre: {name}</h6>
          <div>
            <p>Numero de Cuenta: {account_number}</p>
            <p>Cuenta Id: {params.accountId} </p>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-8/12 px-4 mx-auto mt-6 rounded-md bg-red-300">
        <h4> Balance</h4>
        <div className="w-full flex flex-col">
          {balance?.transactions.map((transaction) => {
            return (
              <div key={transaction._id} className="flex gap-4 justify-between">
                <p> Tipo de transaccion: {transaction.transaction_type}</p>
                <p> Monto: {transaction.transactionAmount}</p>
              </div>
            );
          })}
          <p>Total: ${initialAmount}</p>
        </div>
      </div>
      <div className="w-full lg:w-8/12 px-4 mx-auto mt-6 rounded-md bg-red-300">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Nueva Transaccion
        </button>
      </div>
    </section>
  );
};

export default accountIdPage;
