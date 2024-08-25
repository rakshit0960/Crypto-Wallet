"use client";

import { ethers }  from 'ethers';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react"

export default function Page() {
  const [publicKey, setPublicKey] = useState<string>("");
  const [balance, setBalance] = useState<string>("");

  async function getBalance() {
    console.log(publicKey);
    const response = await fetch(`/api/eth/balance/${publicKey}`);
    const data = await response.json();
    console.log(data);
    setBalance(JSON.stringify(ethers.formatEther(data.result)));
  }

  return (
    <div>
      <div>balance: {balance}</div>
      <Input type="text" onChange={e => setPublicKey(e.target.value)}/>
      <Button onClick={getBalance}>Get Balance</Button>
    </div>
  )
}