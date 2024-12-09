"use client";
import MnemonicInput from "@/components/MnemonicInput";
import Nav from "@/components/Nav";

export default function Page() {
  return (
    <>
      <Nav />
      <div className="py-4 sm:py-8 w-full min-h-screen flex flex-col gap-6 sm:gap-10 items-center px-4 sm:px-[10%]">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl sm:text-3xl font-semibold tracking-tight first:mt-0">
          Secret Recovery Phrase
        </h2>
        <p className="text-lg sm:text-xl text-muted-foreground text-center">
          Enter your 12-word recovery phrase to import your wallet
        </p>
        <MnemonicInput />
      </div>
    </>
  );
}
