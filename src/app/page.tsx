"use client";
import Nav from "@/components/Nav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
  const [hasAccount, setHasAccount] = useState<boolean>(false);
  useEffect(() => {
    if (localStorage.getItem("AccountData")) {
      setHasAccount(true);
    }
  }, []);
  return (
    <>
      <Nav />
      <div className="w-full h-screen grid place-content-center">
        <Card>
          <CardHeader>
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
              Crypto Wallet
            </h1>
          </CardHeader>

          <CardContent className="flex flex-col gap-8">
            {hasAccount && (
              <Link href="/wallet" className="w-full">
                <Button className="w-full">Go To Wallet</Button>
              </Link>
            )}
            <Link href="/create" className="w-full">
              <Button className="w-full">Create Wallet</Button>
            </Link>
            <Link href="/import" className="w-full">
              <Button className="w-full">Import Wallet</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
