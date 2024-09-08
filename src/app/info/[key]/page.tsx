"use client";
import { fetchSolBalance, fetchSolRecentTransactions } from "@/lib/helpers";
import { useStore } from "@/store/store";
import { useEffect, useState } from "react";

interface WalletInfo {
  balance: number;
  recentTransactions: any;
}

export default function Page({ params }: { params: { key: string } }) {
  const [walletInfo, setWalletInfo] = useState<WalletInfo | null>(null);
  const network = useStore(state => state.network);

  async function fetchInfo(publicKey: string): Promise<WalletInfo> {
    let balance = await fetchSolBalance(publicKey, network);
    let recentTransactions = await fetchSolRecentTransactions(publicKey, network);
    return {
      balance,
      recentTransactions,
    };
  }

  useEffect(() => {
    fetchInfo(params.key).then((info) => setWalletInfo(info));
  }, []);

  return <div>{walletInfo && JSON.stringify(walletInfo)}</div>;
}
