import { create } from "zustand";
import { Users } from "../interfaces/Users";

interface UserState {
  data: Users[];
  set: (users: Users[]) => void;
  add: (user: Users) => void;
  update: (user: Users) => void;
  delete: (userId: string) => void;
  clear: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  data: [],
  set: (users) => set({ data: users }),
  add: (user) => set((state) => ({ data: [...state.data, user] })),
  update: (user) =>
    set((state) => ({
      data: state.data.map((u) => (u.id === user.id ? user : u)),
    })),
  delete: (userId) =>
    set((state) => ({
      data: state.data.filter((u) => u.id !== userId),
    })),
  clear: () => set({ data: [] }),
}));
