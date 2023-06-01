import { NextApiRequest, NextApiResponse } from 'next';

const getStorefrontItems = async (authToken: any): Promise<any> => {
  const options = {
    headers: {
      Authorization: 'Bearer ' + authToken,
      accept: 'application/json',
      'content-type': 'application/json',
    },
    method: 'GET',
  };

  const resp = await fetch(
    'https://api.fractal.is/sdk/inventory/items',
    options,
  );
  const data = await resp.json();

  return data.templates;
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
  const items = await getStorefrontItems(data.access_token);

  response.status(200).json({
    items: items,
  });
}
