import { create } from "zustand";

import { IFormStoreProps } from "@/types";

const useFormStore = create<IFormStoreProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useFormStore;
