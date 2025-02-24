import { create } from "zustand";
import { Register } from "../interfaces/Register";

interface RegisterState {
  data: Register[];
  set: (registers: Register[]) => void;
  add: (register: Register) => void;
  update: (register: Register) => void;
  delete: (registerId: string) => void;
  clear: () => void;
}

export const useRegisterStore = create<RegisterState>((set) => ({
  data: [],
  set: (registers) => set({ data: registers }),
  add: (register) => set((state) => ({ data: [...state.data, register] })),
  update: (register) =>
    set((state) => ({
      data: state.data.map((r) => (r.id === register.id ? register : r)),
    })),
  delete: (registerId) =>
    set((state) => ({
      data: state.data.filter((r) => r.id !== registerId),
    })),
  clear: () => set({ data: [] }),
}));
