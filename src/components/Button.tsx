"use client";
import React from "react";

interface ButtonProps {
    text: string;
    handleSubmit: (e: React.FormEvent) => Promise<void> | void;
}

export const Button = ({ text, handleSubmit}: ButtonProps) => {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
      type="button"
      onClick={handleSubmit}
    >
     {text}
    </button>
  );
};
