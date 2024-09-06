import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  sendAndConfirmTransaction,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { mnemonicToSeedSync } from "bip39";
import base58 from "bs58";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";
import { TransactionI, Wallet } from "./interfaces";
import { toast } from "@/components/ui/use-toast";

export function createSolanaWallet(
  mnemonic: string,
  walletIndex: number
): Wallet {
  const seed = mnemonicToSeedSync(mnemonic);
  const path = `m/44'/501'/${walletIndex}'/0'`; // This is the derivation path for solana
  const derivedSeed = derivePath(path, seed.toString("hex")).key;
  const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;

  return {
    publicKey: Keypair.fromSecretKey(secret).publicKey.toBase58(),
    privateKey: base58.encode(Keypair.fromSecretKey(secret).secretKey),
    mnemonic: mnemonic,
  };
}

export async function fetchSolBalance(publicKey: string) {
  try {
    const response = await fetch(`/api/sol/balance/${publicKey}`);
    const data = await response.json();
    if (data.error) throw new Error(data.error.message);
    console.log(data);
    const balance = parseInt(data.result.value) / LAMPORTS_PER_SOL;
    return balance;
  } catch (error) {
    console.log(error);
    return 0;
  }
}

export async function fetchSolRecentTransactions(
  publicKey: string
): Promise<TransactionI[]> {
  const response = await fetch(`/api/sol/recentTransactions/${publicKey}`);
  const data = await response.json();
  return data.result;
}

export function unixTimestampToLocalDateTime(timestamp: number): string {
  const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
  return date.toLocaleString(); // Convert to local date and time string
}

export async function createAndSendTransaction(
  base58PrivateKey: string,
  receiverPublicKey: string,
  amount: number
) {
  // Example connection
  const url: string = process.env.NEXT_PUBLIC_HELIUS_URL || "";
  console.log("url", url);
  // console.log("privatekey", base58PrivateKey);
  console.log(
    "pubickey sender",
    Keypair.fromSecretKey(base58.decode(base58PrivateKey)).publicKey.toBase58()
  );
  console.log("receiverKey", receiverPublicKey);
  console.log("amount", amount);
  console.log("lamports", amount * LAMPORTS_PER_SOL);

  const connection = new Connection(url);

  const privateKeyBytes = base58.decode(base58PrivateKey);
  const sender = Keypair.fromSecretKey(privateKeyBytes);
  const receiverPubKey = new PublicKey(receiverPublicKey);
  console.log(
    "balance",
    (await connection.getBalance(sender.publicKey)) / LAMPORTS_PER_SOL
  );

  const { blockhash, lastValidBlockHeight } =
    await connection.getLatestBlockhash();

  let transaction = new Transaction({
    blockhash: blockhash, // Use the fetched recent blockhash
    lastValidBlockHeight: lastValidBlockHeight, // Use the fetched last valid block height
    feePayer: sender.publicKey, // Specify the fee payer
  });

  transaction.add(
    SystemProgram.transfer({
      fromPubkey: sender.publicKey,
      toPubkey: receiverPubKey,
      lamports: amount * LAMPORTS_PER_SOL,
    })
  );

  const signature = await sendAndConfirmTransaction(connection, transaction, [
    sender,
  ]);

  return signature;
}
