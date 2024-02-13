"use client";
import { createAccount } from "@/redux/features/accountSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { FormEvent, useState } from "react";
import { useRouter } from 'next/navigation';
import { Title } from "@/components/Title";
import { AccountForm } from "@/components/AccountForm";
import { AccountState } from "@/redux/interface";

const accountPage = () => {
  const [accountData, setAccountData] = useState<AccountState>({
    name: "",
    account_number: 0,
    initialAmount: 0,
    state: "loading",
  });
  const router = useRouter()

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
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-blue-200">
      <div className="w-full max-w-xs">
        <Title text="Nueva cuenta de Banco" />
        <AccountForm 
          handleSubmit={handleSubmit}
          accountData={accountData}
          setAccountData={setAccountData}
        />
      </div>
    </main>
  );
};

export default accountPage;
