"use client";
import { Balance } from "@/components/Balance";
import { Button } from "@/components/Button";
import { DetailAccount } from "@/components/DetailAccount";
import { Title } from "@/components/Title";
import { fetchAccountById } from "@/redux/features/accountSlice";
import { useAppSelector } from "@/redux/hooks";
import { store } from "@/redux/store";
import { useRouter } from "next/navigation";

import React, { useEffect } from "react";

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
      {state === "loading" && (
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      )}
      <DetailAccount
        name={name || ""}
        account_number={account_number || ""}
        accountId={params.accountId}
      />
      <Balance initialAmount={initialAmount} balance={balance} state={state} />
      <div className="w-full lg:w-8/12 px-4 mx-auto flex justify-center">
        <Button text="Transferencia" handleSubmit={handleClick} />
      </div>
    </section>
  );
};

export default accountIdPage;
