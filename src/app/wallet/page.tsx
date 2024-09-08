"use client";
import solanaImage from "@/../public/solana.png";
import CopyButton from "@/components/CopyButton";
import Nav from "@/components/Nav";
import ReceiveButton from "@/components/ReceiveButton";
import SendButton from "@/components/SendButton";
import TransactionTabContent from "@/components/TransactionTabContent";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import NetworkSelect from "@/components/ui/networkSelect";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WalletTabContent from "@/components/WalletTabContent";
import { createSolanaWallet, fetchSolBalance } from "@/lib/helpers";
import { Account } from "@/types/interfaces";
import { SymbolIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoSwapHorizontal } from "react-icons/io5";
import { useStore } from "@/store/store";
import AirdropRequest from "@/components/AirdropRequest";

export default function Page() {
  const router = useRouter();
  const [account, SetAccount] = useState<Account | null>(null);
  const [walletIndex, setWalletIndex] = useState<number>(0);
  const [balance, setBalance] = useState<number | null>(null);
  const network = useStore((state) => state.network);
  const forceUpdateCount = useStore(state => state.forceUpdateCount);

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    if (account == null) return;
    setBalance(null);
    fetchSolBalance(account.wallets[walletIndex].publicKey, network).then(
      (balance) => setBalance(balance)
    );
  }, [walletIndex, account, network, forceUpdateCount]);

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
  }

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
              <div className="flex gap-2">

              <NetworkSelect />
              <AirdropRequest publicKey={account.wallets[walletIndex].publicKey} />
              </div>
              <Image src={solanaImage} width={100} alt="" />
              <div className="flex gap-2">
                {balance !== null ? (
                  <div>{balance}</div>
                ) : (
                  <SymbolIcon
                    className="animate-spin h-100"
                    width="23"
                    height="23"
                  />
                )}{" "}
                SOL
              </div>
            </CardTitle>
            <CardDescription className="text-center">
              {account.wallets[walletIndex].publicKey}
            </CardDescription>
            <div className="flex justify-center gap-10">
              <SendButton
                privateKey={account.wallets[walletIndex].privateKey}
              />
              <ReceiveButton
                publicKey={account.wallets[walletIndex].publicKey}
              />
              <div className="flex flex-col items-center">
                <Button className="rounded-full" variant={"outline"}>
                  <IoSwapHorizontal />
                </Button>
                <label htmlFor="send">Swap</label>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="Wallets">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="Wallets">Wallets</TabsTrigger>
                <TabsTrigger value="Transaction">Transactions</TabsTrigger>
              </TabsList>
              <TabsContent value="Wallets">
                <WalletTabContent
                  account={account}
                  setWalletIndex={setWalletIndex}
                  walletIndex={walletIndex}
                  deleteWallet={deleteWallet}
                  setBalance={setBalance}
                />
                <div className="flex justify-around py-4">
                  <Button onClick={addWallet}>Add Wallet</Button>
                  <CopyButton
                    text={account.wallets[walletIndex].privateKey}
                    message="copied, private key"
                  >
                    <Button variant={"outline"}>copy Private Key</Button>
                  </CopyButton>
                </div>
              </TabsContent>
              <TabsContent value="Transaction">
                <TransactionTabContent
                  publicKey={account.wallets[walletIndex].publicKey}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
