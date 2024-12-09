import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Network } from "@/types/network";
import { ChevronLeft, ChevronRight, Send, Wallet, Cloud, Globe, Plus } from "lucide-react";

interface TutorialStep {
  title: string;
  description: React.ReactNode;
  icon: React.ReactNode;
}

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  network: Network;
}

export function TutorialDialog({ open, onOpenChange, network }: Props) {
  const [currentStep, setCurrentStep] = useState(0);

  const steps: TutorialStep[] = [
    {
      title: "Welcome to Your Crypto Wallet!",
      description: (
        <div className="space-y-2">
          <p>
            Congratulations on setting up your wallet! This quick tutorial will help you
            understand the main features available to you.
          </p>
          <p className="text-sm text-muted-foreground">
            You can always skip this tutorial and access it later from the navigation menu.
          </p>
        </div>
      ),
      icon: <Wallet className="w-12 h-12 text-primary" />,
    },
    {
      title: "Sending SOL",
      description: (
        <div className="space-y-2">
          <p>
            To send SOL to another wallet:
          </p>
          <ol className="list-decimal list-inside space-y-1 text-sm">
            <li>Click the &quot;Send&quot; button</li>
            <li>Enter the recipient&apos;s wallet address</li>
            <li>Specify the amount to send</li>
            <li>Confirm the transaction</li>
          </ol>
        </div>
      ),
      icon: <Send className="w-12 h-12 text-primary" />,
    },
    {
      title: "Request Airdrop",
      description: (
        <div className="space-y-2">
          <p>
            {network === "devnet" ? (
              "While on devnet, you can request free SOL for testing:"
            ) : (
              "Switch to devnet to request free test SOL:"
            )}
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>Look for the cloud icon in the top menu</li>
            <li>Click to request 1 SOL</li>
            <li>Wait a few seconds for confirmation</li>
          </ul>
          <p className="text-sm text-muted-foreground mt-4">
            Note: Airdrops are only available on devnet for testing purposes.
          </p>
        </div>
      ),
      icon: <Cloud className="w-12 h-12 text-primary" />,
    },
    {
      title: "Network Switching",
      description: (
        <div className="space-y-2">
          <p>
            You can switch between different Solana networks:
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>Devnet: For testing with free SOL</li>
            <li>Mainnet: For real transactions</li>
          </ul>
          <p className="text-sm text-muted-foreground mt-4">
            Always test your transactions on devnet first!
          </p>
        </div>
      ),
      icon: <Globe className="w-12 h-12 text-primary" />,
    },
    {
      title: "Managing Multiple Wallets",
      description: (
        <div className="space-y-2">
          <p>
            You can create and manage multiple wallets:
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>Click &quot;Add Wallet&quot; to create new ones</li>
            <li>Switch between wallets easily</li>
            <li>Each wallet has its own address and balance</li>
          </ul>
        </div>
      ),
      icon: <Plus className="w-12 h-12 text-primary" />,
    },
  ];

  const handleComplete = () => {
    localStorage.setItem("tutorialCompleted", "true");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] w-[95vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="p-2 md:p-4">
          <div className="flex items-center justify-center mb-4">
            {steps[currentStep].icon}
          </div>
          <DialogTitle className="text-center">
            {steps[currentStep].title}
          </DialogTitle>
        </DialogHeader>

        <div className="px-2 md:px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="py-4"
            >
              {steps[currentStep].description}
            </motion.div>
          </AnimatePresence>
        </div>

        <DialogFooter className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => setCurrentStep((prev) => prev - 1)}
              disabled={currentStep === 0}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
            {currentStep < steps.length - 1 ? (
              <Button
                onClick={() => setCurrentStep((prev) => prev + 1)}
              >
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handleComplete}>
                Get Started
              </Button>
            )}
          </div>

          <div className="text-sm text-muted-foreground">
            {currentStep + 1} / {steps.length}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}