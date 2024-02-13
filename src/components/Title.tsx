import React from "react";

interface ITitle {
    text: string
}

export const Title = ({ text }: ITitle) => {
  return (
    <p className="flex justify-center text-sky-700 font-semibold pb-2 text-2xl">
      {text}
    </p>
  );
};
