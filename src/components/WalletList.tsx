import { Wallet } from "@/lib/interfaces";
import WalletCard from "./WalletCard";

interface Props {
  wallets: Wallet[];
  setWallets: (wallets: Wallet[]) => void;
}

export default function WalletList({ wallets, setWallets }: Props) {

  function deleteWallet(privateKey: string) {
    let newWallet = wallets.filter(wallet => wallet.privateKey !== privateKey);
    setWallets(newWallet);
  }

  return (
    <div className="flex flex-col gap-10">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Wallets
      </h2>
      {wallets.map((wallet, index) => (
        <WalletCard key={index} wallet={wallet} deleteWallet={deleteWallet}/>
      ))}
    </div>
  );
}
