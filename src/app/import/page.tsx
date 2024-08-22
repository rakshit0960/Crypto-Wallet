"use client";
import MnemonicInput from "@/components/MnemonicInput";
import Nav from "@/components/Nav";
import WalletList from "@/components/WalletList";
import { Wallet } from "@/lib/interfaces";
import { useState } from "react";

export default function Home() {
  const [Wallets, setWallets] = useState<Wallet[]>([]);

  return (
    <>
      <Nav />
      <div className="py-8 w-full h-screen flex flex-col gap-10 items-start px-[10%]">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Secret Recovery Phrase
        </h2>
        <p className="text-xl text-muted-foreground">
          Enter your 12 word phrase. or leave empty to generate a
          random phrase.
        </p>
        <MnemonicInput wallets={Wallets} setWallets={setWallets} />
        <WalletList wallets={Wallets} setWallets={setWallets}/>
      </div>
    </>
  );
}
