import { createAndSendTransaction } from "@/lib/helpers";
import { SymbolIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { FaArrowUp } from "react-icons/fa";
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
  const { toast } = useToast();

  async function sendSol() {
    try {
      setIsSending(true);
      const res = await createAndSendTransaction(
        privateKey,
        receiverPubKey,
        amount
      );
      console.log('success', res);
      toast({
        title: res
      });
    } catch (error: any) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: error.transactionMessage,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      })
      console.log(JSON.stringify(error))
      console.log('error', error);
    } finally {
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
      <DialogContent className="sm:max-w-[425px]">
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
          <Button onClick={sendSol}>
            {isSending ? (
              <SymbolIcon
                className="animate-spin h-100"
                width="25"
                height="40"
              />
            ) : (
              "Send"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
