import { create } from "zustand";

import { IEditUserStoreProps } from "@/types";

const useEditUserStore = create<IEditUserStoreProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useEditUserStore;
