/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import MainModal from "../MainModal";
import Form from "../Form";

import useFormStore from "@/stores/FormStore";

import { AiOutlineClose } from "react-icons/ai";

import { IFormModalProps } from "@/types";

const FormModal: React.FC<IFormModalProps> = ({
  session,
  placeholder,
  buttonLabel,
}) => {
  const router = useRouter();

  const formStore = useFormStore();

  const handleClose = () => {
    formStore.onClose();
    router.push("/");
  };

  useEffect(() => {
    formStore.onOpen();
  }, []);

  const searchParams = useSearchParams();
  const tweetId = searchParams.get("tweetId");

  const formModalConent = (
    <div className="text-white">
      <div className="sticky top-0 z-50 flex items-center gap-2.5 bg-black/60 p-2 backdrop-blur-lg">
        <button
          className="rounded-full p-3 transition hover:bg-slate-300 hover:bg-opacity-10"
          onClick={handleClose}
        >
          <AiOutlineClose size={20} color="white" />
        </button>
      </div>
      <div className="px-3 py-2">
        <Form
          session={session}
          placeholder={placeholder}
          buttonLabel={buttonLabel}
          tweetId={tweetId || ""}
          isModal
        />
      </div>
    </div>
  );
  return (
    <MainModal
      isOpen={formStore.isOpen}
      onClose={formStore.onClose}
      onSubmit={() => {}}
      position="topCenter"
      isFormModal
      formModalContent={formModalConent}
    />
  );
};

export default FormModal;
