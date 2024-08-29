"use client";
import { useToast } from "@/components/ui/use-toast";
import { createSolanaWallet } from "@/lib/helpers";
import { Account } from "@/lib/interfaces";
import { ToastAction } from "@radix-ui/react-toast";
import { generateMnemonic, validateMnemonic } from "bip39";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";


export default function MnemonicInput() {
  const ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const { toast } = useToast()
  const router = useRouter();
  const [mnemonicArray, setMnemonicArray] = useState<string[]>(
    Array.from(" ".repeat(12))
  );

  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      if (e.clipboardData == null) return;
      let paste = e.clipboardData.getData("text");
      console.log(paste);
      let newMnemonicArray = [...mnemonicArray];
      paste.split(' ').map(((word, index) => newMnemonicArray[index] = word));
      setMnemonicArray(newMnemonicArray);
    }
    window.addEventListener('paste', handlePaste);

    return () => window.removeEventListener('paste', handlePaste);
  }, [])

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

    const account: Account = {
      walletCount: 1,
      mnemonic: mnemonic,
      wallets: [createSolanaWallet(mnemonic, 0)]
    }
    localStorage.setItem('AccountData', JSON.stringify(account));
    router.push('/wallet')
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
