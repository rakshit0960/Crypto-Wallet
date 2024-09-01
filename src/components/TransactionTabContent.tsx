import {
  fetchSolRecentTransactions,
  unixTimestampToLocalDateTime,
} from "@/lib/helpers";
import { SymbolIcon } from "@radix-ui/react-icons";
import { Copy } from "lucide-react";
import { useEffect, useState } from "react";
import CopyButton from "./CopyButton";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Transaction } from "@/lib/interfaces";

interface Props {
  publicKey: string;
}

export default function TransactionTabContent({ publicKey }: Props) {
  const [Transactions, setTransactions] = useState<Transaction[] | null>(null);

  useEffect(() => {
    fetchSolRecentTransactions(publicKey).then((data) => setTransactions(data));
  }, []);

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
                    {unixTimestampToLocalDateTime(transaction.blockTime)}
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
