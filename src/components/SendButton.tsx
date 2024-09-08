import { createAndSendTransaction } from "@/lib/helpers";
import { useStore } from "@/store/store";
import { useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import { useShallow } from "zustand/react/shallow";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { ToastAction } from "./ui/toast";
import { useToast } from "./ui/use-toast";

interface Props {
  privateKey: string;
}
export default function SendButton({ privateKey }: Props) {
  const [amount, setAmount] = useState<number>(0);
  const [receiverPubKey, setReceiverPubKey] = useState<string>("");
  const [isSending, setIsSending] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean | null>(null);
  const { toast } = useToast();
  const { network, setNetwork } = useStore(
    useShallow((state) => ({
      network: state.network,
      setNetwork: state.setNetwork,
    }))
  );

  async function sendSol() {
    try {
      setIsSending(true);
      const res = await createAndSendTransaction(
        privateKey,
        receiverPubKey,
        amount,
        network
      );
      console.log("success", res);
      toast({
        title: `successful sent ${amount}!`,
        description: `transaction signature: ${res}`,
      });
      setSuccess(true);
    } catch (error: any) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: error.message || error.transactionMessage,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      console.log(JSON.stringify(error));
      console.log("error", error);
      setSuccess(false);
    } finally {
      setNetwork(network); // tiger re-render
      setIsSending(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex flex-col items-center">
          <Button id="send" className="rounded-full" variant={"outline"}>
            <FaArrowUp />
          </Button>
          <label
            htmlFor="send
          "
          >
            Send
          </label>
        </div>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Send Solana</DialogTitle>
          <DialogDescription>
            Transfer solana to other solana wallet
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="amount" className="text-right">
              Amount
            </Label>
            <Input
              onChange={(e) => setAmount(parseFloat(e.target.value))}
              id="amount"
              type="number"
              value={amount}
              className="col-span-3"
              min={0}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="receiver" className="text-right">
              Receiver
            </Label>
            <Input
              id="receiver"
              onChange={(e) => setReceiverPubKey(e.target.value)}
              value={receiverPubKey}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          {isSending ? (
            <Button disabled>sending...</Button>
          ) : (
            <Button onClick={sendSol}>Send</Button>
          )}
        </DialogFooter>
        {success === true && (
          <p className="mt-4 text-green-500">
            Transaction successful! Check your wallet.
          </p>
        )}
        {success === false && (
          <p className="mt-4 text-red-500">
            Transaction failed. Please try again.
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
}
