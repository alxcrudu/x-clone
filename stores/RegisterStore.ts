import { create } from "zustand";

import { IRegisterStoreProps } from "@/types";

const useRegisterStore = create<IRegisterStoreProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useRegisterStore;
