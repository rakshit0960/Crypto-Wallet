import { Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { mnemonicToSeedSync } from "bip39";
import base58 from "bs58";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";
import { Transaction, Wallet } from "./interfaces";


export function createSolanaWallet(mnemonic: string, walletIndex: number): Wallet {
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
  const response = await fetch(`/api/sol/balance/${publicKey}`);
  const data = await response.json();
  const balance = parseInt(data.result.value) / LAMPORTS_PER_SOL;
  return balance
}

export async function fetchSolRecentTransactions(publicKey: string): Promise<Transaction[]> {
  const response = await fetch(`/api/sol/recentTransactions/${publicKey}`);
  const data = await response.json();
  return data.result;
}


export function unixTimestampToLocalDateTime(timestamp: number): string {
  const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
  return date.toLocaleString(); // Convert to local date and time string
}
