import React from "react";
import { ScrollArea } from "./ui/scroll-area";
import WalletComponent from "./WalletComponent";
import { Account } from "@/lib/interfaces";

interface Props {
  account: Account;
  walletIndex: number;
  setWalletIndex: (walletIndex: number) => void;
  setBalance: (balance: number | null) => void;
  deleteWallet: (privateKey: string) => void;
}

export default function WalletTabContent({
  account,
  setWalletIndex,
  deleteWallet,
  walletIndex,
  setBalance,
}: Props) {
  return (
    <ScrollArea className="h-72 rounded-md ">
      <div className=" flex flex-col gap-2">
        {account.wallets.map((wallet, index) => {
          if (index == walletIndex) return;
          return (
            <WalletComponent
              changeWallet={() => {
                setBalance(null);
                setWalletIndex(index);
              }}
              onDelete={deleteWallet}
              key={wallet.publicKey}
              wallet={wallet}
              index={index}
            />
          );
        })}
      </div>
    </ScrollArea>
  );
}
