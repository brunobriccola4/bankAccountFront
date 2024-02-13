"use client";
import React, { useState } from "react";
import { useAppSelector } from "@/redux/hooks";

import { TransferForm } from "@/components/TransferForm";
import { Title } from "@/components/Title";

const TransactionPage = () => {
  const { id } = useAppSelector((state) => state.account);
  const initialAccountId = id ?? "";
  const [transaction, setTransaction] = useState({
    account_id: initialAccountId,
    transactionAmount: 0,
    transaction_type: "retiro | deposito",
  });

  return (
    <section className="flex justify-center items-center bg-blue-200 pt-4 h-screen">
      <div className="w-full max-w-xs flex justify-center flex-col">
        <Title text="Nueva Transaccion" />

        <TransferForm
          transaction={transaction}
          setTransaction={setTransaction}
          initialAccountId={initialAccountId}
          id={id}
        />
      </div>
    </section>
  );
};

export default TransactionPage;
