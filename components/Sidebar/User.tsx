"use client";

import React from "react";

import { Session } from "next-auth";

import UserWidget from "../User/UserWidget";

import useUser from "@/hooks/useUser";

interface IUserProps {
  session: Session;
};

const User = ({ session }: IUserProps) => {
  const { data: user } = useUser(session.user.id);
  if (!user) return null;

  return <UserWidget user={user} hasMenu />;
};

export default User;
