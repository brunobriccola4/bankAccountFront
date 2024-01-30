"use client";
import { createAccount } from "@/redux/features/accountSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { FormEvent, useState } from "react";
import { AccountState } from "@/redux/features/accountSlice";
import { useRouter } from 'next/navigation';

const accountPage = () => {
  const [accountData, setAccountData] = useState<AccountState>({
    name: "",
    account_number: 0,
    initialAmount: 0,
    state: "loading",
  });
  const router = useRouter()

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = ev.target;
    setAccountData({
      ...accountData,
      [name]: value,
    });
  };

  const dispatch = useAppDispatch();

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      const response = await dispatch(createAccount(accountData));
      let accountId = response.payload?.id
      if(response.payload.id) {
        router.push(`/account/${accountId}`)
      }
    } catch (error) {
      console.error('no se pudo crear el usuario')      
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-full max-w-xs">
        <h1 className="flex justify-center text-cyan-600 font-semibold pb-2">
          {" "}
          Nueva cuenta de Banco
        </h1>
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Nombre
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Ingrese su nombre"
              // defaultValue={userName}
              onChange={(ev) => handleChange(ev)}
              // value={name}
              name={"name"}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Numero de Cuenta
            </label>
            <input
              className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="accountNumber"
              type="number"
              placeholder="Ingrese su numero de cuenta"
              name={"account_number"}
              onChange={(ev) => handleChange(ev)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Saldo inicial
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="initialAmount"
              type="number"
              placeholder="Ingrese el saldo"
              onChange={(ev) => handleChange(ev)}
              name={"initialAmount"}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              type="button"
              onClick={handleSubmit}
            >
              Crear cuenta
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default accountPage;
