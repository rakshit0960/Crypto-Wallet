"use client";
import { fetchSolBalance, fetchSolRecentTransactions } from "@/lib/helpers";
import { useEffect, useState } from "react";

interface WalletInfo {
  balance: number;
  recentTransactions: any;
}

export default function Page({ params }: { params: { key: string } }) {
  const [walletInfo, setWalletInfo] = useState<WalletInfo | null>(null);

  async function fetchInfo(publicKey: string): Promise<WalletInfo> {
    let balance = await fetchSolBalance(publicKey);
    let recentTransactions = await fetchSolRecentTransactions(publicKey);
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
