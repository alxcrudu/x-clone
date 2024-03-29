/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useCallback, useEffect, useReducer, useState } from "react";

import MainModal from "../MainModal";
import Input from "@/components/Input";

import axios from "axios";

import toast from "react-hot-toast";

import useRegisterStore from "@/stores/RegisterStore";

import formValidation from "@/libs/formValidation";
import { UserCreationRequest } from "@/libs/validators/user";

type ActionProps = { type: "UPDATE_INPUT"; KEY: string; value: string };

const initialState = {
  name: "",
  username: "",
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

const RegisterModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const registerStore = useRegisterStore();

  const [state, dispatch] = useReducer(reducer, initialState);

  const onSubmit = useCallback(async () => {
    setIsLoading(true);
    const { name, username, email, password } = state;

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
      const payload: UserCreationRequest = {
        name,
        username,
        email,
        password,
      };

      const res = await axios.post("/api/register", payload);

      if (res.status === 200) {
        toast.success("Success!");
      }
    } catch (err) {
      toast.error("Error :/");
    } finally {
      setIsLoading(false);
      registerStore.onClose();
    }
  }, [state, registerStore]);

  useEffect(() => {
    registerStore.onOpen();
  }, []);

  const registerModalBody = (
    <form className="flex flex-col gap-6">
      <Input type="text" label="Name" KEY="name" dispatch={dispatch} />
      <Input type="text" label="Username" KEY="username" dispatch={dispatch} />
      <Input type="email" label="Email" KEY="email" dispatch={dispatch} />
      <Input
        type="password"
        label="Password"
        KEY="password"
        dispatch={dispatch}
      />
    </form>
  );

  return (
    <MainModal
      isOpen={registerStore.isOpen}
      onClose={registerStore.onClose}
      onSubmit={onSubmit}
      title="Create your account"
      buttonLabel="Register"
      body={registerModalBody}
      isLoading={isLoading}
      position="center"
    />
  );
};

export default RegisterModal;
