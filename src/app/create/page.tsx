"use client";
import MnemonicDisplay from "@/components/MnemonicDisplay";
import Nav from "@/components/Nav";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { Account } from "@/types/interfaces";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const { toast } = useToast();
  const [saved, setSaved] = useState<boolean>(false);
  const [mnemonic, setMnemonic] = useState<string>("");
  const router = useRouter();

  const createAccount = () => {
    if (mnemonic === "") {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with Secret phrase",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      })
      return;
    }

    const account: Account = {
      walletCount: 0,
      mnemonic: mnemonic,
      wallets: []
    }
    localStorage.setItem('AccountData', JSON.stringify(account));
    router.push('/wallet');
  }

  return (
    <>
      <Nav />
      <div className="py-8 w-full h-screen flex flex-col gap-10 items-center px-[10%]">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Recovery Phrase
        </h2>
        <p className="text-xl text-muted-foreground">
          Save these words in a safe place.
        </p>
        <MnemonicDisplay mnemonic={mnemonic} setMnemonic={setMnemonic} />
        <div className="flex items-center space-x-2 hover:text-gray-700 dark:hover:text-gray-300">
          <input
            onClick={() => setSaved((saved) => !saved)}
            type="checkbox"
            id="terms"
            className="h-4 w-4  cursor-pointer"
          ></input>
          <label
            htmlFor="terms"
            className=" cursor-pointer text-md font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I saved my secret recovery phrase
          </label>
        </div>
        <Button className="w-[250px] mt-3 " disabled={!saved} onClick={createAccount}>
          Next
        </Button>
      </div>
    </>
  );
}
