"use client";

import React from "react";
import { Title } from "./Title";

interface IDetailAccount {
  accountId: string | "";
  name: string;
  account_number: number | "";
}

export const DetailAccount = ({
  accountId,
  name,
  account_number,
}: IDetailAccount) => {
  return (
    <div className="w-full lg:w-8/12 p-4 mx-auto  bg-slate-50 rounded-md">
      <Title text="Detail Account" />
      <div className="w-full rounded-md gap-4 flex flex-col">
        <h6 className="text-slate-950 "> Nombre: {name}</h6>
        <p className="text-slate-950">Numero de Cuenta: {account_number}</p>
        <p className="text-slate-950"> Cuenta Id: {accountId} </p>
      </div>
    </div>
  );
};
