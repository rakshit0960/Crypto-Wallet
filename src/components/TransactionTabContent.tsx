import {
  fetchSolRecentTransactions,
  unixTimestampToLocalDateTime,
} from "@/lib/helpers";
import { useStore } from "@/store/store";
import { SymbolIcon } from "@radix-ui/react-icons";
import { ConfirmedSignatureInfo } from "@solana/web3.js";
import { Copy } from "lucide-react";
import { useEffect, useState } from "react";
import CopyButton from "./CopyButton";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";

interface Props {
  publicKey: string;
}

export default function TransactionTabContent({ publicKey }: Props) {
  const [Transactions, setTransactions] = useState<ConfirmedSignatureInfo[] | null>(null);
  const network = useStore(state => state.network);
  useEffect(() => {
    setTransactions(null)
    fetchSolRecentTransactions(publicKey, network).then((data) => setTransactions(data));
  }, [network, publicKey]);

  if (Transactions == null) {
    return (
      <div className="grid place-content-center h-72">
        <SymbolIcon className="animate-spin h-100" width="40" height="40" />
      </div>
    );
  }

  return (
    <>
      <ScrollArea className="h-72 rounded-md ">
        <div className="flex flex-col gap-2">
          {Transactions.map((transaction, index) => {
            return (
              <Card key={index}>
                <CardHeader>
                  <div className="px-4">
                    {unixTimestampToLocalDateTime(transaction.blockTime || 0)}
                  </div>
                </CardHeader>
                <CardContent className="flex items-center justify-between">
                  <a href={`https://explorer.solana.com/tx/${transaction.signature}`}>
                    <Button variant="link">
                      {transaction.signature.substring(0, 23)}...
                    </Button>
                  </a>
                  <CopyButton
                    text={transaction.signature}
                    message="successfully copied transaction signature"
                  >
                    <Copy className="cursor-pointer" />
                  </CopyButton>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </ScrollArea>
      <div className="py-10"></div>
    </>
  );
}
