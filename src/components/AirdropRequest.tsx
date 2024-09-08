import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useStore } from "@/store/store";
import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  clusterApiUrl,
} from "@solana/web3.js";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useShallow } from "zustand/react/shallow";

type Prop = {
  publicKey: string;
};
const AirdropRequest = ({ publicKey }: Prop) => {
  const [amount, setAmount] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean | null>(null);
  const { network, setNetwork } = useStore(
    useShallow((state) => ({
      network: state.network,
      setNetwork: state.setNetwork,
    }))
  );

  const requestAirdrop = async () => {
    setLoading(true);
    setSuccess(null);

    let connection = new Connection(clusterApiUrl("devnet"));

    if (network == "mainnet")
      connection = new Connection(process.env.NEXT_PUBLIC_HELIUS_URL || "");

    console.log(connection.rpcEndpoint);
    console.log(network);

    const pubKey = new PublicKey(publicKey);

    try {
      const airdropSignature = await connection.requestAirdrop(
        pubKey,
        amount * LAMPORTS_PER_SOL
      );
      await connection.confirmTransaction(airdropSignature);
      setSuccess(true);
    } catch (error) {
      console.error("Airdrop failed:", error);
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">AirDrop</Button>
      </DialogTrigger>
      <DialogContent className="max-w-md mx-auto mt-10 p-6 shadow-md rounded-md">
        <DialogTitle>

        <h1 className="text-xl font-semibold  mb-4">Request SOL Airdrop</h1>
        </DialogTitle>

        <label htmlFor="amount" className="block text-sm font-medium ">
          Amount (SOL)
        </label>
        <Input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          placeholder="1"
          className="mt-1 mb-4 block w-full"
          min={1}
        />

        <Button
          onClick={requestAirdrop}
          disabled={loading || !publicKey}
          className="w-full"
        >
          {loading ? "Requesting Airdrop..." : "Request Airdrop"}
        </Button>

        {success === true && (
          <p className="mt-4 text-green-500">
            Airdrop successful! Check your wallet.
          </p>
        )}
        {success === false && (
          <p className="mt-4 text-red-500">Airdrop failed. Please try again.</p>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AirdropRequest;
