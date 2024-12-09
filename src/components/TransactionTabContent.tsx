import {
  fetchSolRecentTransactions,
  unixTimestampToLocalDateTime,
} from "@/lib/helpers";
import { useStore } from "@/store/store";
import { ConfirmedSignatureInfo } from "@solana/web3.js";
import { Copy, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import CopyButton from "./CopyButton";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { LoadingAnimation } from "./ui/loading-animation";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  publicKey: string;
}

export default function TransactionTabContent({ publicKey }: Props) {
  const [transactions, setTransactions] = useState<ConfirmedSignatureInfo[] | null>(null);
  const network = useStore(state => state.network);
  const forceUpdateCount = useStore(state => state.forceUpdateCount);

  useEffect(() => {
    const fetchTransactions = async () => {
      setTransactions(null);
      try {
        const data = await fetchSolRecentTransactions(publicKey, network);
        setTransactions(data);
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
        setTransactions([]);
      }
    };

    fetchTransactions();
  }, [network, publicKey, forceUpdateCount]);

  if (transactions === null) {
    return <LoadingAnimation />;
  }

  if (transactions.length === 0) {
    return (
      <div className="h-72 grid place-content-center text-center text-muted-foreground">
        <p className="mb-2">No transactions found</p>
        <p className="text-sm">Make a transaction to see it appear here</p>
      </div>
    );
  }

  const getExplorerUrl = (signature: string) => {
    const baseUrl = network === 'mainnet'
      ? 'https://explorer.solana.com'
      : 'https://explorer.solana.com/?cluster=devnet';
    return `${baseUrl}/tx/${signature}`;
  };

  return (
    <>
      <ScrollArea className="h-72 rounded-md">
        <AnimatePresence mode="popLayout">
          <div className="flex flex-col gap-2">
            {transactions.map((transaction, index) => (
              <motion.div
                key={transaction.signature}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2, delay: index * 0.1 }}
              >
                <Card className="group hover:shadow-md transition-shadow duration-200">
                  <CardHeader className="py-2 md:py-3">
                    <div className="px-2 md:px-4 flex justify-between items-center text-xs md:text-sm text-muted-foreground">
                      <span className="truncate">{unixTimestampToLocalDateTime(transaction.blockTime || 0)}</span>
                      <div className="flex items-center gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                        <CopyButton
                          text={transaction.signature}
                          message="Transaction signature copied"
                        >
                          <Copy className="h-4 w-4 cursor-pointer hover:text-primary" />
                        </CopyButton>
                        <a
                          href={getExplorerUrl(transaction.signature)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-primary"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="py-1 md:py-2">
                    <div className="font-mono text-xs md:text-sm truncate">
                      {transaction.signature.substring(0, 15)}...
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      </ScrollArea>
    </>
  );
}
