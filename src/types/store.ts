import { forceUpdateSlice } from "@/store/forceupdate-slice";
import { NetworkSlice } from "@/store/network-slice";

export type Store = NetworkSlice & forceUpdateSlice;