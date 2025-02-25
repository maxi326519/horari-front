import { create } from "zustand";
import { Users } from "../interfaces/Users";

type SesionStore = {
  data: Users | null;
  set: (user: Users) => void;
  clear: () => void;
};

const useSesionStore = create<SesionStore>()((set) => ({
  data: null,
  set: (user: Users) => set(() => ({ data: user })),
  clear: () => set(() => ({ data: null })),
}));

export default useSesionStore;
