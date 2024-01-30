"use client";
import { fetchAccountById } from "@/redux/features/accountSlice";
import { useAppSelector } from "@/redux/hooks";
import { store } from "@/redux/store";
import { useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";

const accountIdPage = ({ params }: { params: { accountId: string } }) => {
  const { account_number, name, balance, initialAmount, state } =
    useAppSelector((state) => state.accountReducer);
    const router = useRouter()

  useEffect(() => {
    if (!params.accountId) {
      return;
    }
    store.dispatch(fetchAccountById(params.accountId));
  }, [params.accountId]);

  const handleClick = () => {
    router.push('/transaction')
  };
  

  return (
    <section className="py-6 bg-blueGray-50 h-96 gap-4 flex flex-col">
      {state === "loading" && <p>Loading Page...</p>}
      <div className="w-full lg:w-8/12 px-4 mx-auto  bg-slate-50 rounded-md">
        <h2 className=" text-3xl font-extrabold leading-none tracking-tight text-sky-700 md:text-4xl">
          {" "}
          Detail Account
        </h2>
        <div className="w-full bg-slate-100 rounded-md">
          <h6 className="text-slate-950"> Nombre: {name}</h6>
          <p className="text-slate-950">Numero de Cuenta: {account_number}</p>
          <p className="text-slate-950"> Cuenta Id: {params.accountId} </p>
        </div>
      </div>
      <div className="w-full lg:w-8/12 px-4 mx-auto rounded-md bg-slate-50">
        <div className="pt-2">
          <h4 className=" text-3xl font-extrabold leading-none tracking-tight text-sky-700 md:text-4xl">
            Balance
          </h4>
        </div>
        <div className="w-full flex flex-col">
          {balance?.transactions.map((transaction) => {
            return (
              <div key={transaction._id} className="flex gap-4 justify-between">
                <p className="text-slate-950">
                  {" "}
                  Tipo de transaccion: {transaction.transaction_type}
                </p>
                <p className="text-slate-600">
                  ${transaction.transactionAmount}
                </p>
              </div>
            );
          })}
          <p className="text-slate-900 text-2xl">Total: ${initialAmount}</p>
        </div>
      </div>
      <div className="w-full lg:w-8/12 px-4 mx-auto flex justify-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-60"
          type="button"
          onClick={handleClick}
        >
          Transferencia
        </button>
      </div>{" "}
    </section>
  );
};

export default accountIdPage;
