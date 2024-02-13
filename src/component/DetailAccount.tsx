"use client";

import { Title } from "./Title";

interface IDetailAccount {
    name: string,
    account_number: string,
    accountId: string
}

export const DetailAccount = ({ name, account_number, accountId }: IDetailAccount) => {
  return (
    <div className="w-full lg:w-8/12 p-4 mx-auto  bg-slate-50 rounded-md">
      <Title title="Detail Account" />
      <div className="w-full rounded-md">
        <h6 className="text-slate-950"> Nombre: {name}</h6>
        <p className="text-slate-950">Numero de Cuenta: {account_number}</p>
        <p className="text-slate-950"> Cuenta Id: {accountId} </p>
      </div>
    </div>
  );
};
