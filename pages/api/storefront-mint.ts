import { NextApiRequest, NextApiResponse } from 'next';

const storefrontMint = async (authToken: any, request: any): Promise<any> => {
  const options = {
    body: JSON.stringify({
      walletPublicKey: request.walletPublicKey,
    }),
    headers: {
      Authorization: 'Bearer ' + authToken,
      accept: 'application/json',
      'content-type': 'application/json',
    },
    method: 'POST',
  };

  const resp = await fetch(
    'https://api.fractal.is/sdk/v1/inventory/solana/item/' +
      request.itemId +
      '/create_mint_transaction',
    options,
  );
  const data = await resp.json();

  return data.url;
};

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const options = {
    body: JSON.stringify({
      client_id: process.env.ADORABLE_RINGOS_CLIENT_ID,
      client_secret: process.env.ADORABLE_RINGOS_CLIENT_SECRET,
    }),
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
    method: 'POST',
  };

  const resp = await fetch(
    'https://auth-api.fractal.is/auth/oauth/token',
    options,
  );

  const data = await resp.json();
  const url = await storefrontMint(data.access_token, request.body);

  response.status(200).json({
    url: url,
  });
}
