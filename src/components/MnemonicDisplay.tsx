"use client";
import { ToastAction } from "@radix-ui/react-toast";
import { generateMnemonic } from "bip39";
import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { useToast } from "./ui/use-toast";
import { SymbolIcon } from "@radix-ui/react-icons";

interface Props {
  mnemonic: string;
  setMnemonic: (mnemonic: string) => void;
}

export default function MnemonicDisplay({ mnemonic, setMnemonic }: Props) {
  const { toast } = useToast();

  useEffect(() => {
    let newMnemonic = generateMnemonic();
    setMnemonic(newMnemonic);
    console.log(newMnemonic);
  }, []);

  const copyText = (text: string) => {
    try {
      navigator.clipboard.writeText(text);
      toast({
        description: "Copied Secret recovery phrase!",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  };

  // loading State if mnemonic in not generated yet
  if (mnemonic === "") {
    return <SymbolIcon className="animate-spin h-100" width="40" height="40" />;
  }

  return (
    <Card
      className="dark:hover:bg-gray-900 hover:bg-gray-300 cursor-pointer"
      onClick={() => copyText(mnemonic)}
    >
      <CardHeader></CardHeader>
      <CardContent className="grid grid-cols-3 gap-3 ">
        {mnemonic.split(" ").map((word, index) => {
          return (
            <div key={index}>
              <div className="py-3 px-10 flex gap-2 text-lg">
                <span className="text-gray-500">{index}</span>
                <span className="">{word}</span>
              </div>
            </div>
          );
        })}
      </CardContent>
      <CardFooter className="flex justify-center">
        <div className=" border-t px-[25%] pt-2">click anywhere to copy</div>
      </CardFooter>
    </Card>
  );
}
