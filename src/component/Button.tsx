"use client";

interface ButtonProps {
  text: string;
  onClick: (e: React.FormEvent) => Promise<void> | void;
}

export const Button = ({ text, onClick }: ButtonProps) => {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
      type="button"
      onClick={onClick}
    >
      {text}
    </button>
  );
};
