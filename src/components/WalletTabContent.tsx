import React, { useState, useEffect } from "react";
import { ScrollArea } from "./ui/scroll-area";
import WalletComponent from "./WalletComponent";
import { Account } from "@/types/interfaces";
import { LoadingAnimation } from "./ui/loading-animation";
import { motion, AnimatePresence } from "framer-motion";
import { Wallet } from "lucide-react";

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
  const [isLoading, setIsLoading] = useState(true);
  const additionalWallets = account.wallets.filter((_, index) => index !== walletIndex);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingAnimation />;
  }

  if (additionalWallets.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="h-72 grid place-content-center text-center text-muted-foreground"
      >
        <Wallet className="w-12 h-12 mx-auto mb-4 opacity-20" />
        <p className="mb-2">No additional wallets</p>
        <p className="text-sm">Click &apos;Add Wallet&apos; to create more</p>
      </motion.div>
    );
  }

  return (
    <ScrollArea className="h-72 rounded-md">
      <AnimatePresence mode="popLayout">
        <div className="flex flex-col gap-2 p-1">
          {account.wallets.map((wallet, index) => {
            if (index === walletIndex) return null;
            return (
              <WalletComponent
                key={wallet.publicKey}
                changeWallet={() => {
                  setBalance(null);
                  setWalletIndex(index);
                }}
                onDelete={deleteWallet}
                wallet={wallet}
                index={index}
              />
            );
          })}
        </div>
      </AnimatePresence>
    </ScrollArea>
  );
}
