import { create } from "zustand";

interface LoadingState {
  state: boolean;
  setLoading: (loading: boolean) => void;
  open: () => void;
  close: () => void;
}

const useLoading = create<LoadingState>((set) => ({
  state: false,
  setLoading: (loading: boolean) => set({ state: loading }),
  open: () => set({ state: true }),
  close: () => set({ state: false }),
}));

export default useLoading;
