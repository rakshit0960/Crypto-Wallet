"use client";

import Nav from "@/components/Nav";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import WalletCard from "@/components/WalletCard";
import { Account } from "@/lib/interfaces";
import { SymbolIcon } from "@radix-ui/react-icons";
import { Keypair } from "@solana/web3.js";
import { mnemonicToSeedSync, validateMnemonic } from "bip39";
import base58 from "bs58";
import { derivePath } from "ed25519-hd-key";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import nacl from "tweetnacl";

export default function Page() {
  const { toast } = useToast();
  const router = useRouter();
  const [account, SetAccount] = useState<Account | null>(null);

  useEffect(() => {
    const localData = localStorage.getItem("AccountData");
    if (localData == null) {
      router.push("/");
      return;
    }
    const account: Account = JSON.parse(localData);
    SetAccount({...account});

    if (account.wallets.length == 0) {
      const seed = mnemonicToSeedSync(account.mnemonic);
      const path = `m/44'/501'/0'/0'`; // This is the derivation path for solana
      const derivedSeed = derivePath(path, seed.toString("hex")).key;
      const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;

      account.wallets.push({
        publicKey: Keypair.fromSecretKey(secret).publicKey.toBase58(),
        privateKey: base58.encode(Keypair.fromSecretKey(secret).secretKey),
        mnemonic: account.mnemonic,
      });

      SetAccount({...account});
      localStorage.setItem("AccountData", JSON.stringify(account));
    }
  }, []);

  function deleteWallet(privateKey: string) {
    if (account == null) return;
    account.wallets = account?.wallets.filter(
      (wallet) => wallet.privateKey !== privateKey
    );
    SetAccount({...account});
    localStorage.setItem("AccountData", JSON.stringify(account));
  }

  const addWallet = () => {
    if (account == null) return;
    let mnemonic = account.mnemonic;

    // if mnemonic is not valid show error tost
    if (validateMnemonic(mnemonic) === false) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "The Mnemonic entered is not valid.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      return;
    }
    const seed = mnemonicToSeedSync(mnemonic);
    const path = `m/44'/501'/${account.wallets.length}'/0'`; // This is the derivation path for solana
    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;

    account.wallets.push({
      publicKey: Keypair.fromSecretKey(secret).publicKey.toBase58(),
      privateKey: base58.encode(Keypair.fromSecretKey(secret).secretKey),
      mnemonic: mnemonic,
    });
    SetAccount({...account});
    localStorage.setItem("AccountData", JSON.stringify(account));
  };

  if (account == null) {
    return <SymbolIcon className="animate-spin h-100" width="40" height="40" />;
  }

  return (
    <>
      <Nav />
      <div className="flex flex-col gap-10 py-10 px-[12%]">
        <Button variant={"secondary"} onClick={addWallet}>
          Add Wallet
        </Button>
        <div className="flex flex-col gap-10">
          {account.wallets.map((wallet, index) => (
            <WalletCard
              key={index}
              wallet={wallet}
              deleteWallet={deleteWallet}
            />
          ))}
        </div>
      </div>
    </>
  );
}
