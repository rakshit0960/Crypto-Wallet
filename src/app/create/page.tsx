"use client";
import MnemonicDisplay from "@/components/MnemonicDisplay";
import Nav from "@/components/Nav";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";

export default function Page() {
  const [saved, setSaved] = useState<boolean>(false);

  return (
    <>
      <Nav />
      <div className="py-8 w-full h-screen flex flex-col gap-10 items-center px-[10%]">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Secret Recovery Phrase
        </h2>
        <p className="text-xl text-muted-foreground">
          Save these words in a safe place.
        </p>
        <MnemonicDisplay />
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
        <Link href="/wallet">
          <Button className="w-[250px] mt-3 " disabled={!saved}>
            Next
          </Button>
        </Link>
      </div>
    </>
  );
}
