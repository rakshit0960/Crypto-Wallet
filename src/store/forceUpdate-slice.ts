import { StateCreator } from "zustand";

type forceUpdateState = {
  forceUpdateCount: number;
};

type forceUpdateAction = {
  forceUpdate: () => void;
};

export type forceUpdateSlice = forceUpdateState & forceUpdateAction;

export const createForceUpdateSlice: StateCreator<
  forceUpdateSlice,
  [["zustand/immer", never]],
  [],
  forceUpdateSlice
> = (set) => ({
  forceUpdateCount: 0,
  forceUpdate: () =>
    set((state) => {
      state.forceUpdateCount = state.forceUpdateCount + 1;
    }),
});
