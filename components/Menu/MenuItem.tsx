"use client";

import React from "react";
import { IMenuItemProps } from "@/types";

const MenuItem: React.FC<IMenuItemProps> = ({
  label,
  color,
  icon: Icon,
  onClick,
}) => {
  const onSubmit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick();
  };
  return (
    <button
      className={`
        ${color === "red" && "text-red-700"}
        ${color === "lightGray" && "text-ligthGray"}
        flex w-full min-w-[300px] items-center gap-3 px-5 py-3 text-sm font-semibold duration-100 hover:bg-slate-400 hover:bg-opacity-10
      `}
      onClick={onSubmit}
    >
      {Icon && <Icon size={17} color={color} />}
      {label}
    </button>
  );
};

export default MenuItem;
