import { Connection, VersionedTransaction } from "@solana/web3.js";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const url = `https://solana-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`;
  try {
    const body = await request.json();
    const serializedTransaction = body.serializedTransaction;

    if (!serializedTransaction) {
      return new Response("Transaction is missing", {
        status: 400,
      });
    }

    // Initialize a connection to Solana using Alchemy's endpoint
    const connection = new Connection(url);

    // Deserialize the transaction
    const transaction = VersionedTransaction.deserialize(
      Buffer.from(serializedTransaction, "base64")
    );

    // Send the transaction to Alchemy
    const signature = await connection.sendTransaction(transaction);

    return Response.json({ signature });
  } catch (error) {
    console.error("Error sending transaction:", error);

    return new Response("Error sending transaction", {
      status: 500,
    });
  }
}
