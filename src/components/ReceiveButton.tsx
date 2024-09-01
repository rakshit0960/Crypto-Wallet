"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { SymbolIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import QRCode from "qrcode";
import { useEffect, useState } from "react";
import { FaArrowDown } from "react-icons/fa";
import CopyButton from "./CopyButton";
import { Button } from "./ui/button";
import { ToastAction } from "./ui/toast";
import { useToast } from "./ui/use-toast";

export default function ReceiveButton({ publicKey }: { publicKey: string }) {
  const [qrSrc, setQrSrc] = useState<string | null>(null);
  const { toast } = useToast();

  async function generateQr(text: string) {
    QRCode.toDataURL(publicKey, {
      width: 280,
      margin: 3,
      color: { dark: "#22c55e", light: "#18181b" },
    })
      .then((url) => {
        setQrSrc(url);
      })
      .catch((err) => {
        toast({
          title: "Uh oh! Something went wrong.",
          description: "There was a problem generating QR code",
          action: (
            <ToastAction altText="Try again" onClick={(e) => generateQr(text)}>
              Try again
            </ToastAction>
          ),
        });
        console.error(err);
      });
  }
  useEffect(() => {
    generateQr(publicKey);
  });
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex flex-col items-center">
          <Button className="rounded-full" variant={"outline"}>
            <FaArrowDown />
          </Button>
          <label htmlFor="send">Receive</label>
        </div>
      </DialogTrigger>
      <DialogContent className="flex flex-col items-center gap-6">
        <DialogTitle>Deposit</DialogTitle>
        <DialogDescription className="text-gray-400">
          This address can only receive assets on Solana.
        </DialogDescription>
        {qrSrc == null ? (
          <div className="h-[280px] w-[280px] grid place-content-center">
            <SymbolIcon className="animate-spin h-100" width="30" height="40" />
          </div>
        ) : (
          <Image
            className="rounded-xl"
            src={qrSrc}
            alt=""
            width={280}
            height={280}
          />
        )}
        <DialogFooter className="grid place-items-center gap-6">
          <p>{publicKey}</p>
          <CopyButton text={publicKey} message="copied public key">
            <Button>Copy PublicKey</Button>
          </CopyButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
