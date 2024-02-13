"use client";
import React, { FormEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { newTransaction } from "@/redux/features/accountSlice";
import { useRouter } from "next/navigation";
import { Title } from "@/component/Title";
import { Button } from "@/component/Button";
import { Transfer } from "@/component/Transfer";

const TransactionPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { id } = useAppSelector((state) => state.account);
  const initialAccountId = id ?? "";
  const [transaction, setTransaction] = useState({
    account_id: initialAccountId,
    transactionAmount: 0,
    transaction_type: "retiro | deposito",
  });

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      console.log("transaction", transaction);
      const response = await dispatch(newTransaction(transaction));
      console.log("response", response);
      if (response.type == "transactions/fulfilled") {
        router.push(`/account/${initialAccountId}`);
      }
    } catch (error) {
      console.error("no se pudo crear el usuario");
    }
  };

  return (
    <section className="flex justify-center items-center">
      <div className="w-full max-w-xs flex justify-center flex-col">
        <Title title="Nueva Transaccion" />
        <Transfer transaction={transaction} setTransaction={setTransaction} id={id}/>
        <div className="flex items-center justify-between">
          <Button text="Confirmar Transaccion" onClick={handleSubmit} />
        </div>
      </div>
    </section>
  );
};

export default TransactionPage;
