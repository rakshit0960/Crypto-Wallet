import solanaImage from "@/../public/solana.png";
import { Wallet } from "@/types/interfaces";
import Image from "next/image";
import { FaRegCopy } from "react-icons/fa";
import CopyButton from "./CopyButton";
import DeleteIcon from "./DeleteIcon";
import { Card, CardHeader } from "./ui/card";
import { IconContext } from "react-icons";
export default function WalletComponent({
  wallet,
  index,
  onDelete,
  changeWallet,
}: {
  wallet: Wallet;
  index: number;
  onDelete: (privateKey: string) => void;
  changeWallet: () => void;
}) {
  return (
    <IconContext.Provider value={{ size: "20" }}>
      <Card>
        <CardHeader>
          <div className="flex items-center relative">
            <Image src={solanaImage} width={80} alt="" />
            <div
              className="dark:hover:bg-inherit hover:bg-gray-100 cursor-pointer rounded-md px-2"
              onClick={changeWallet}
            >
              <div>Wallet {index + 1}</div>
              <div>{wallet.publicKey.substring(0, 11)}...</div>
            </div>
            <div className="absolute right-0 flex gap-2 items-center">
              <CopyButton text={wallet.publicKey} message="copied public key">
                <FaRegCopy className="cursor-pointer" />
              </CopyButton>
              <DeleteIcon onDelete={() => onDelete(wallet.privateKey)} />
            </div>
          </div>
        </CardHeader>
      </Card>
    </IconContext.Provider>
  );
}
