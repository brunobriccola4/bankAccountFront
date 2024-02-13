"use client";

interface Title {
  title: string;
}

export const Title = ({ title }: Title) => {
  return (
    <h1 className="flex justify-center text-sky-700 font-semibold pb-2 text-2xl">
      {title}
    </h1>
  );
};
