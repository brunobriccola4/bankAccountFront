import React from "react";
import { Button } from "./Button";

export const AccountForm = ({ accountData, setAccountData, handleSubmit }: any) => {
  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = ev.target;
    setAccountData({
      ...accountData,
      [name]: value,
    });
  };
  return (
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
          onChange={(ev) => handleChange(ev)}
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
        <Button handleSubmit={handleSubmit} text="Crear cuenta" />
      </div>
    </form>
  );
};
