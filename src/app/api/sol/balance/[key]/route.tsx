export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: { key: string } }
) {
  const url = `https://solana-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`;
  const publicKey = params.key;
  console.log(params);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method: "getBalance",
      params: [publicKey],
    }),
  });

  const data = await response.json();
  return Response.json(data);
}
