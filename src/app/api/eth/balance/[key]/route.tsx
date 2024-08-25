export async function GET(
  request: Request,
  { params }: { params: { key: string } }
) {
  const key = params.key;
  const response = await fetch(
    `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
    {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        id: 1,
        jsonrpc: "2.0",
        method: "eth_getBalance",
        params: [key, 'latest'],
      }),
    }
  );
  const data = await response.json();
  return Response.json(data);
}
