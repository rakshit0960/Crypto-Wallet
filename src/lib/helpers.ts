import { Keypair } from "@solana/web3.js";
import { mnemonicToSeedSync } from "bip39";
import base58 from "bs58";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";
import { Wallet } from "./interfaces";


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