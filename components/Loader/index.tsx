"use client";

import React from "react";

import Spinner from "../Spinner";

import { ILoaderProps } from "@/types";

const Loader: React.FC<ILoaderProps> = ({ message, isForFullPage }) => {
  return (
    <div
      className={`
      ${isForFullPage && "fixed left-0 top-0 h-screen w-screen bg-black"}
      flex h-full w-full flex-col items-center justify-center p-10
    `}
    >
      <Spinner />
      {message && (
        <p className="my-8 text-lg font-semibold text-neutral-500">{message}</p>
      )}
    </div>
  );
};

export default Loader;
