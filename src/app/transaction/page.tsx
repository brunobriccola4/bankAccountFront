"use client";
import React, { FormEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { newTransaction } from "@/redux/features/accountSlice";
import { useRouter } from "next/navigation";

const TransactionPage = () => {
  const { id } = useAppSelector((state) => state.account);
  const initialAccountId = id ?? "";
  const [transaction, setTransaction] = useState({
    account_id: initialAccountId,
    transactionAmount: 0,
    transaction_type: "retiro | deposito",
  });
  const router = useRouter()
  const dispatch = useAppDispatch();

  console.log("id", id);

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = ev.target;
    setTransaction({
      ...transaction,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      console.log("transaction", transaction);
      const response = await dispatch(newTransaction(transaction));
      console.log('response', response)
      if(response.type == "transactions/fulfilled") {
        router.push(`/account/${initialAccountId}`)
      }
    } catch (error) {
      console.error("no se pudo crear el usuario");
    }
  };

  return (
    <section className="flex justify-center items-center">
      <div className="w-full max-w-xs flex justify-center flex-col">
        <h1 className="flex justify-center text-cyan-600 font-semibold pb-2">
          Nueva Transaccion
        </h1>
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Numero de cuenta
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="account_number"
              type="text"
              placeholder="Ingrese el numero de cuenta"
              // defaultValue={id}
              onChange={(ev) => handleChange(ev)}
              value={id}
              name={"account_number"}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Tipo
            </label>
            <input
              className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="transaction_type"
              type="text"
              placeholder="Tipo de transaccion"
              name={"transaction_type"}
              onChange={(ev) => handleChange(ev)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Importe
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="transactionAmount"
              type="number"
              placeholder="Ingrese el saldo"
              onChange={(ev) => handleChange(ev)}
              name={"transactionAmount"}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              type="button"
              onClick={handleSubmit}
            >
              Confirmar Transaccion
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default TransactionPage;
