"use client";
import Nav from "@/components/Nav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Page() {
  const [hasAccount, setHasAccount] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("AccountData")) {
      setHasAccount(true);
    }
    setIsLoading(false);
  }, []);

  if (isLoading) return null;

  return (
    <>
      <Nav />
      <div className="w-full h-screen grid place-content-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardHeader>
              <motion.h1
                className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl"
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Crypto Wallet
              </motion.h1>
            </CardHeader>

            <CardContent className="flex flex-col gap-8">
              {hasAccount && (
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <Link href="/wallet" className="w-full">
                    <Button className="w-full">Go To Wallet</Button>
                  </Link>
                </motion.div>
              )}
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Link href="/create" className="w-full">
                  <Button className="w-full">Create Wallet</Button>
                </Link>
              </motion.div>
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Link href="/import" className="w-full">
                  <Button className="w-full">Import Wallet</Button>
                </Link>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </>
  );
}
