import { Business } from "../interfaces/Business";
import { create } from "zustand";

interface BusinessState {
  data: Business[];
  set: (businesses: Business[]) => void;
  add: (business: Business) => void;
  update: (business: Business) => void;
  delete: (businessId: string) => void;
  clear: () => void;
}

export const useBusinessStore = create<BusinessState>((set) => ({
  data: [],
  set: (businesses) => set({ data: businesses }),
  add: (business) => set((state) => ({ data: [...state.data, business] })),
  update: (business) =>
    set((state) => ({
      data: state.data.map((b) => (b.id === business.id ? business : b)),
    })),
  delete: (businessId) =>
    set((state) => ({
      data: state.data.filter((b) => b.id !== businessId),
    })),
  clear: () => set({ data: [] }),
}));
