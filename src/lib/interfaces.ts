export interface Wallet {
  publicKey: string;
  privateKey: string;
  mnemonic: string;
}


export interface Account {
  mnemonic: string
  walletCount: number
  wallets: Wallet[];
}