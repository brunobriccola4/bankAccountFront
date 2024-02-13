'use client'
import React, { FormEvent } from "react";
import { newTransaction } from "@/redux/features/accountSlice";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { Button } from "./Button";

export const TransferForm = ({transaction, setTransaction, initialAccountId, id}: any) => {

  const router = useRouter()
  const dispatch = useAppDispatch();

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
        <Button
          text='Confirmar Transaccion'
          handleSubmit={handleSubmit}
        />

      </div>
    </form>
  );
};
