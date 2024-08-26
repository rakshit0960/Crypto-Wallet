export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: { key: string } }
) {
  const url = `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`;
  console.log(params);
  const { key } = params;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      id: 1,
      jsonrpc: "2.0",
      method: "eth_getBalance",
      params: [key, "latest"],
    }),
  });
  const data = await response.json();
  return Response.json(data);
}
