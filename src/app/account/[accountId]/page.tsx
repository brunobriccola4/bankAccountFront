"use client";
import { Balance } from "@/component/Balance";
import { Button } from "@/component/Button";
import { DetailAccount } from "@/component/DetailAccount";
import Spinner from "@/component/Spinner";
import { fetchAccountById } from "@/redux/features/accountSlice";
import { useAppSelector } from "@/redux/hooks";
import { store } from "@/redux/store";
import { useRouter } from "next/navigation";

import React, { FormEvent, useEffect } from "react";

const accountIdPage = ({ params }: { params: { accountId: string } }) => {
  const { account_number, name, state } =
    useAppSelector((state) => state.account);
    const router = useRouter()

  useEffect(() => {
    if (!params.accountId) {
      return;
    }
    store.dispatch(fetchAccountById(params.accountId));
  }, [params.accountId]);

  const handleClick = (e: FormEvent) => {
    e.preventDefault();
    router.push("/transaction");
  };
  

  return (
    <section className="flex min-h-screen flex-col items-center justify-between p-8 bg-blue-200">
      {state === "loading" && <Spinner />}
      <DetailAccount
        name={name}
        accountId={params.accountId}
        account_number={account_number}
      />
      <Balance />
      <Button 
        text="Transferencia"
        onClick={handleClick}
      />
    </section>
  );
};

export default accountIdPage;
