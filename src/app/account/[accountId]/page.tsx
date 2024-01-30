"use client";
import { fetchAccountById } from "@/redux/features/accountSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { store } from "@/redux/store";

import React, { useEffect } from "react";

const accountIdPage = ({ params }: { params: { accountId: string } }) => {
  console.log("params", params);
  const { accountId } = params;
  const { id, account_number, state, name, balance } = useAppSelector(
    (state) => state.accountReducer
  );
  //   const dispatch = useAppDispatch();

  useEffect(() => {
    if (!params) {
      return;
    }
    store.dispatch(fetchAccountById(accountId));
  }, [accountId]);

  return (
    <section className=" py-1 bg-blueGray-50 ">
      <div className="w-full lg:w-8/12 px-4 mx-auto mt-6 bg-slate-50 rounded-md">
        <h2 className="text-zinc-950"> Detail Account</h2>
        <div className="w-80 bg-slate-500">
          <h6> Name: {name}</h6>
          <div>
            <p>Account Number: {account_number}</p>
            <p>Account Id: {id} </p>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-8/12 px-4 mx-auto mt-6 rounded-md bg-red-300">
        <h4> Balance</h4>
        <div>
          {balance?.transactions.map(function (transaction) {
            return (
              <div>
                <p> Type: {transaction.transaction_type}</p>
                <p> Amount: {transaction.total}</p>
              </div>
            );
          })}
          <p>Total: {balance?.total}</p>
        </div>
      </div>
    </section>
  );
};

export default accountIdPage;
