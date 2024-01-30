"use client";
import { fetchAccountById } from "@/redux/features/accountSlice";
import { useAppSelector } from "@/redux/hooks";
import { store } from "@/redux/store";
import { useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";

const accountIdPage = ({ params }: { params: { accountId: string } }) => {
  const { account_number, name, balance, initialAmount, state } =
    useAppSelector((state) => state.account);
  const router = useRouter();

  useEffect(() => {
    if (!params.accountId) {
      return;
    }
    store.dispatch(fetchAccountById(params.accountId));
  }, [params.accountId]);

  const handleClick = () => {
    router.push("/transaction");
  };

  return (
    <section className="flex min-h-screen flex-col items-center justify-between p-8 bg-blue-200">
      {state === "loading" && <p>Loading Page...</p>}
      <div className="w-full lg:w-8/12 p-4 mx-auto  bg-slate-50 rounded-md">
        <h2 className=" text-2xl font-extrabold leading-none tracking-tight text-sky-700 md:text-3xl text-center">
          {" "}
          Detail Account
        </h2>
        <div className="w-full rounded-md">
          <h6 className="text-slate-950"> Nombre: {name}</h6>
          <p className="text-slate-950">Numero de Cuenta: {account_number}</p>
          <p className="text-slate-950"> Cuenta Id: {params.accountId} </p>
        </div>
      </div>
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
                <p className="text-slate-600">
                  ${transaction.transactionAmount}
                </p>
              </div>
            );
          })}
          <p className="text-slate-900 text-1xl text-end pt-4 pb-4">
            Total: ${initialAmount}
          </p>
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
      </div>
    </section>
  );
};

export default accountIdPage;
