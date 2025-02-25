import { Register } from "../interfaces/Register";
import { create } from "zustand";

interface EmployeeRegisterStore {
  data: Register | null;
  set: (register: Register) => void;
  update: (register: Register) => void;
  clear: () => void;
}

export const useEmployeeRegisterStore = create<EmployeeRegisterStore>(
  (set) => ({
    data: null,
    set: (registers) => set({ data: registers }),
    update: (register) => set((state) => ({ ...state, data: register })),
    clear: () => set({ data: null }),
  })
);
