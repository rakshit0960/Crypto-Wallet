import solanaImage from "@/../public/solana.png";
import { Wallet } from "@/types/interfaces";
import Image from "next/image";
import { FaRegCopy } from "react-icons/fa";
import CopyButton from "./CopyButton";
import DeleteIcon from "./DeleteIcon";
import { Card, CardHeader } from "./ui/card";
import { IconContext } from "react-icons";
import { motion } from "framer-motion";

interface Props {
  wallet: Wallet;
  index: number;
  onDelete: (privateKey: string) => void;
  changeWallet: () => void;
}

export default function WalletComponent({
  wallet,
  index,
  onDelete,
  changeWallet,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      whileHover={{ y: -2 }}
    >
      <IconContext.Provider value={{ size: "20" }}>
        <Card className="group hover:shadow-md transition-all duration-200">
          <CardHeader className="py-3 md:py-4">
            <div className="flex items-center relative">
              <Image src={solanaImage} width={60} height={60} alt="" className="w-16 md:w-20" />
              <div
                className="dark:hover:bg-inherit hover:bg-gray-100 cursor-pointer rounded-md px-2 transition-colors"
                onClick={changeWallet}
              >
                <div className="font-medium text-sm md:text-base">Wallet {index + 1}</div>
                <div className="text-xs md:text-sm text-muted-foreground">
                  {wallet.publicKey.substring(0, 8)}...
                </div>
              </div>
              <div className="absolute right-0 flex gap-2 items-center opacity-100 md:opacity-70 md:group-hover:opacity-100 transition-opacity">
                <CopyButton text={wallet.publicKey} message="copied public key">
                  <FaRegCopy className="cursor-pointer hover:text-primary transition-colors" />
                </CopyButton>
                <DeleteIcon onDelete={() => onDelete(wallet.privateKey)} />
              </div>
            </div>
          </CardHeader>
        </Card>
      </IconContext.Provider>
    </motion.div>
  );
}
