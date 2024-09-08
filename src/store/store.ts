import { Store } from "@/types/store";
import { immer } from "zustand/middleware/immer";
import { create } from "zustand";
import { createNetworkSlice } from "./network-slice";
import { createForceUpdateSlice } from "./forceUpdate-slice";

export const useStore = create<Store>()(
  immer((...a) => ({
    ...createNetworkSlice(...a),
    ...createForceUpdateSlice(...a)
  }))
);
