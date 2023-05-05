import { NextApiRequest, NextApiResponse } from 'next';

const generateBurnTx = async (authToken: any, request: any): Promise<any> => {
  const options = {
    headers: {
      Authorization: 'Bearer ' + authToken,
      accept: 'application/json',
      'content-type': 'application/json',
    },
    method: 'GET',
  };

  const resp = await fetch(
    'https://api.fractal.is/sdk/solana/generate_burn_token_transaction?token_id=' +
      request.itemId +
      '&wallet_id=' +
      request.walletPublicKey,
    options,
  );

  const data = await resp.json();

  return data.transactionBase58;
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
  const transactionBase58 = await generateBurnTx(
    data.access_token,
    request.body,
  );

  response.status(200).json({
    transactionBase58: transactionBase58,
  });
}
