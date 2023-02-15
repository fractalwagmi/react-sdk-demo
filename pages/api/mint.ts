import { NextApiRequest, NextApiResponse } from 'next';

const generateMintTx = async (authToken: any, request: any): Promise<any> => {
  if (!request.email.includes('@fractal.is')) {
    console.log('invalid email');
    return '';
  }

  if (request.name === '') {
    console.log('must fill out name');
    return '';
  }
  if (request.description === '') {
    console.log('must fill out description');
    return '';
  }
  if (request.symbol === '') {
    console.log('must fill out symbol');
    return '';
  }
  if (request.recipient === '') {
    console.log('must fill out recipient');
    return '';
  }
  if (request.imageBytes === '') {
    console.log('must fill out imageBytes');
    return '';
  }

  const options = {
    body: JSON.stringify({
      metadata: {
        attributes: {
          Date: request.attributes.date,
          Game: request.attributes.game,
          Position: request.attributes.position,
          Season: request.attributes.season,
        },
        creators: [
          {
            address: '2ibfysdYESH3VYyt8WhwXwjJshStpkiTVA5aBZQFS9CZ',
            share: 90,
          },
        ],
        description: request.description,
        imageBytes: request.imageBytes,
        name: request.name,
        sellerFeeBasisPoints: 500,
        symbol: request.symbol,
      },
      payer: request.payer,
      recipient: request.recipient,
    }),
    headers: {
      Authorization: 'Bearer ' + authToken,
      accept: 'application/json',
      'content-type': 'application/json',
    },
    method: 'POST',
  };

  const resp = await fetch('https://api.fractal.is/sdk/v1/mint', options);
  const data = await resp.json();

  return data.url;
};

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const options = {
    body: JSON.stringify({
      client_id: process.env.FRACTAL_GAME_NIGHT_CLIENT_ID,
      client_secret: process.env.FRACTAL_GAME_NIGHT_CLIENT_SECRET,
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
  const url = await generateMintTx(data.access_token, request.body);

  response.status(200).json({
    url: url,
  });
}
