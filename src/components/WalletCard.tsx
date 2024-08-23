import { Wallet } from "@/lib/interfaces";
import { TrashIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { ToastAction } from "./ui/toast";
import { useToast } from "./ui/use-toast";
import Image from "next/image";
import solanaImage from "@/../public/solana.png";
import ShowHideContent from "./ShowHideContent";

interface Props {
  wallet: Wallet;
  deleteWallet: (privateKey: string) => void;
}
export default function WalletCard({ wallet, deleteWallet }: Props) {
  const { toast } = useToast();

  const copyText = (text: string, message: string) => {
    try {
      navigator.clipboard.writeText(text);
      toast({
        description: message,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-4">
          <div>Solana Wallet</div>
          <Image src={solanaImage} alt="" width={70} height={70}></Image>
        </CardTitle>
        <CardDescription>Wallet generated using mnemonics.</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div>public Key: </div>
          <div>{wallet.publicKey}</div>
        </div>
        <div className="flex items-center gap-3">
          <div>Private Key: </div>
          <ShowHideContent content={wallet.privateKey} />
        </div>
      </CardContent>

      <CardFooter className="flex justify-start gap-8">
        <Button
          onClick={() => copyText(wallet.publicKey, "Copied, Public Key")}
          variant={"outline"}
        >
          Copy Public Key
        </Button>
        <Button
          onClick={() => copyText(wallet.privateKey, "Copied, Private Key")}
          variant={"outline"}
        >
          Copy Private Key
        </Button>
        <Button
          onClick={() => deleteWallet(wallet.privateKey)}
          variant={"destructive"}
        >
          Delete Wallet <TrashIcon className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
