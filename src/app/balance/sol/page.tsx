"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fetchSolBalance } from "@/lib/helpers";
import { useState } from "react";

export default function Page() {
  const [publicKey, setPublicKey] = useState<string>("");
  const [balance, setBalance] = useState<string>("");

  async function getBalance() {
    setBalance((await fetchSolBalance(publicKey)).toString())
  }

  return (
    <div className="w-full h-screen grid place-content-center gap-10">
      <div className="text-4xl">balance: {balance}</div>
      <Input
        placeholder="public key"
        type="text"
        onChange={(e) => setPublicKey(e.target.value)}
      />
      <Button onClick={getBalance}>Get Balance</Button>
    </div>
  );
}
