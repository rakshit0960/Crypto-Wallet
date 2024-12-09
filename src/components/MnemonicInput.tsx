"use client";
import { validateMnemonic } from "@/lib/helpers";
import { Account } from "@/types/interfaces";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Input } from "./ui/input";
import { useToast } from "./ui/use-toast";

export default function MnemonicInput() {
  const [mnemonic, setMnemonic] = useState<string>("");
  const router = useRouter();
  const { toast } = useToast();

  const importWallet = () => {
    if (mnemonic === "") {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter your recovery phrase",
      });
      return;
    }

    if (!validateMnemonic(mnemonic)) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Invalid recovery phrase",
      });
      return;
    }

    const account: Account = {
      walletCount: 0,
      mnemonic: mnemonic,
      wallets: [],
    };
    localStorage.setItem("AccountData", JSON.stringify(account));
    router.push("/wallet");
  };

  return (
    <Card className="w-full max-w-[600px]">
      <CardContent className="pt-6">
        <textarea
          value={mnemonic}
          onChange={(e) => setMnemonic(e.target.value)}
          placeholder="Enter your 12-word recovery phrase"
          className="min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
        />
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-4 sm:gap-8">
        <Button
          onClick={importWallet}
          className="w-full sm:w-auto"
        >
          Import Wallet
        </Button>
        <Button
          variant="outline"
          onClick={() => router.push("/create")}
          className="w-full sm:w-auto"
        >
          Create New Wallet
        </Button>
      </CardFooter>
    </Card>
  );
}
