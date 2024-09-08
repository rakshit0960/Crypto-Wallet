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

export interface TransactionI {
  blockTime: number
  confirmationStatus: string
  signature: string
  slot: number
}