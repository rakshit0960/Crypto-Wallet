"use client";
import { useToast } from "@/components/ui/use-toast";
import { Wallet } from "@/lib/interfaces";
import { ToastAction } from "@radix-ui/react-toast";
import { Keypair } from "@solana/web3.js";
import { generateMnemonic, mnemonicToSeedSync, validateMnemonic } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { useState } from "react";
import nacl from "tweetnacl";
import { Button } from "./ui/button";
import bs58 from 'bs58';
import { createSolanaWallet } from "@/lib/helpers";

interface Props {
  wallets: Wallet[];
  setWallets: (wallets: Wallet[]) => void;
}

export default function MnemonicInput({ wallets, setWallets }: Props) {
  const ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const { toast } = useToast()
  const [walletsCount, setWalletsCount] = useState<number>(0);
  const [mnemonicArray, setMnemonicArray] = useState<string[]>(
    Array.from(" ".repeat(12))
  );

  const addWallet = () => {
    let mnemonic = mnemonicArray.join(" ");

    // generate random mnemonic if input is empty
    if (!mnemonicArray.find((ch) => ch !== " ")) {
      mnemonic = generateMnemonic();
      setMnemonicArray(mnemonic.split(" "));
    }

    // if mnemonic is not valid show error tost
    if (validateMnemonic(mnemonic) === false) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "The Mnemonic entered is not valid.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      })
      return;
    }
    
    const newWalletList = [...wallets];
    newWalletList.push(createSolanaWallet(mnemonic, walletsCount));
    setWallets(newWalletList);
    setWalletsCount(walletsCount + 1);
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="grid grid-cols-3 gap-3">
        {ids.map((id, index) => (
          <div key={id} className="relative">
            <input
              type="text  "
              className="py-2 px-1 pl-8 rounded-sm border"
              value={mnemonicArray[index]}
              onChange={(e) =>
                setMnemonicArray((prevArray) => {
                  let newArray = [...prevArray];
                  newArray[index] = e.target.value;
                  return newArray;
                })
              }
            ></input>
            <span className="absolute bottom-2 left-2">{id}</span>
          </div>
        ))}
      </div>
      <Button onClick={addWallet}>Add Wallet</Button>
    </div>
  );
}
