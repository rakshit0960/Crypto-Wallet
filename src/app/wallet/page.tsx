"use client";
import solanaImage from "@/../public/solana.png";
import CopyButton from "@/components/CopyButton";
import Nav from "@/components/Nav";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import WalletComponent from "@/components/WalletComponent";
import { createSolanaWallet, fetchSolBalance } from "@/lib/helpers";
import { Account } from "@/lib/interfaces";
import { SymbolIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { IoSwapHorizontal } from "react-icons/io5";

export default function Page() {
  const router = useRouter();
  const [account, SetAccount] = useState<Account | null>(null);
  const [walletIndex, setWalletIndex] = useState<number>(0);
  const [balance, setBalance] = useState<number>(0);

  useEffect(  () => {
    const localData = localStorage.getItem("AccountData");
    if (localData == null) {
      router.push("/");
      return;
    }
    const account: Account = JSON.parse(localData);
    SetAccount({ ...account });

    if (account.wallets.length == 0) {
      account.wallets.push(createSolanaWallet(account.mnemonic, 0));

      account.walletCount++;
      SetAccount({ ...account });
      localStorage.setItem("AccountData", JSON.stringify(account));
    }
    fetchSolBalance(account.wallets[walletIndex].publicKey).then(balance => setBalance(balance));
  }, []);

  function deleteWallet(privateKey: string) {
    if (account == null) return;
    account.wallets = account?.wallets.filter(
      (wallet) => wallet.privateKey !== privateKey
    );
    SetAccount({ ...account });
    localStorage.setItem("AccountData", JSON.stringify(account));
  }

  function addWallet() {
    if (account == null) return;

    account.wallets.push(
      createSolanaWallet(account.mnemonic, account.walletCount)
    );
    account.walletCount++;
    SetAccount({ ...account });
    localStorage.setItem("AccountData", JSON.stringify(account));
  };

  if (account == null) {
    return (
      <div className="w-full h-screen grid place-content-center">
        <SymbolIcon className="animate-spin h-100" width="40" height="40" />
      </div>
    );
  }

  return (
    <>
      <Nav />
      <div className="w-full h-screen grid place-content-center">
        <Card className="px-4 flex flex-col gap-10 w-[450px]">
          <CardHeader>
            <CardTitle className="flex flex-col items-center gap-2">
              <Image src={solanaImage} width={100} alt="" />
              <div>{balance} SOL</div>
            </CardTitle>
            <CardDescription className="text-center">
              {account.wallets[walletIndex].publicKey}
            </CardDescription>
            <div className="flex justify-center gap-10">
              <div className="flex flex-col items-center">
                <Button id="send" className="rounded-full" variant={"outline"}>
                  <FaArrowUp />
                </Button>
                <label htmlFor="send">Send</label>
              </div>
              <div className="flex flex-col items-center">
                <Button className="rounded-full" variant={"outline"}>
                  <FaArrowDown />
                </Button>
                <label htmlFor="send">Receive</label>
              </div>
              <div className="flex flex-col items-center">
                <Button className="rounded-full" variant={"outline"}>
                  <IoSwapHorizontal />
                </Button>
                <label htmlFor="send">Swap</label>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-72 rounded-md ">
              <div className=" flex flex-col gap-2">
                {account.wallets.map((wallet, index) => {
                  if (index == walletIndex) return;
                  return (
                    <WalletComponent
                      changeWallet={() => setWalletIndex(index)}
                      onDelete={deleteWallet}
                      key={wallet.publicKey}
                      wallet={wallet}
                      index={index}
                    />
                  );
                })}
              </div>
            </ScrollArea>
          </CardContent>
          <CardFooter className="flex justify-around">
            <Button onClick={addWallet}>Add Wallet</Button>
            <CopyButton
              text={account.wallets[walletIndex].privateKey}
              message="copied, private key"
            >
              <Button variant={"outline"}>copy Private Key</Button>
            </CopyButton>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
