import { create } from "zustand";

import { ILoginStoreProps } from "@/types";

const useLoginStore = create<ILoginStoreProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useLoginStore;
