import { Network } from "@/types/network";
import { StateCreator } from "zustand";

type NetworkState = {
  network: Network;
};

type NetworkAction = {
  setNetwork: (network: Network) => void;
};

export type NetworkSlice = NetworkState & NetworkAction;

export const createNetworkSlice: StateCreator<
  NetworkSlice,
  [["zustand/immer", never]],
  [],
  NetworkSlice
> = (set) => ({
  network: "mainnet",
  setNetwork: (network) =>
    set((state) => {
      state.network = network;
    }),
});
