/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useCallback, useEffect, useReducer, useState } from "react";
import { useRouter } from "next/navigation";

import { signIn } from "next-auth/react";

import MainModal from "../MainModal";
import Input from "@/components/Input";

import toast from "react-hot-toast";

import useLoginStore from "@/stores/LoginStore";

import formValidation from "@/libs/formValidation";

type ActionProps = { type: "UPDATE_INPUT"; KEY: string; value: string };

const initialState = {
  email: "",
  password: "",
};

const reducer = (state = initialState, action: ActionProps) => {
  switch (action.type) {
    case "UPDATE_INPUT":
      return {
        ...state,
        [action.KEY]: action.value,
      };
    default:
      return state;
  }
};
const LoginModal = () => {
  const router = useRouter();
  const loginStore = useLoginStore();

  const [isLoading, setIsLoading] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    loginStore.onOpen();
  }, []);

  const onSubmit = useCallback(async () => {
    setIsLoading(true);
    const { email, password } = state;

    const validation = formValidation(state);

    if (!validation.isValidated && validation.toastMessage) {
      toast.error(validation.toastMessage, {
        icon: null,
        style: {
          backgroundColor: "#1D9BF0",
          color: "#e7e9ea",
          width: "fit-content",
        },
        position: "bottom-center",
      });

      setIsLoading(false);
      return;
    }

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        toast.error(res.error, {
          icon: null,
          style: {
            backgroundColor: "#1D9BF0",
            color: "#e7e9ea",
            width: "fit-content",
          },
          position: "bottom-center",
        });
        router.push("/");
        return;
      }

      toast.success("Logged in!");
    } catch (err) {
    } finally {
      setIsLoading(false);
      loginStore.onClose();
      router.push("/");
      router.refresh();
    }
  }, [state, loginStore]);

  const loginModalBody = (
    <div className="flex flex-col gap-4">
      <Input type="email" label="Email" KEY="email" dispatch={dispatch} />
      <Input
        type="password"
        label="Password"
        KEY="password"
        dispatch={dispatch}
      />
    </div>
  );
  return (
    <MainModal
      isOpen={loginStore.isOpen}
      onClose={loginStore.onClose}
      onSubmit={onSubmit}
      title="Login"
      buttonLabel="Log in"
      body={loginModalBody}
      isLoading={isLoading}
      position="center"
    />
  );
};

export default LoginModal;
