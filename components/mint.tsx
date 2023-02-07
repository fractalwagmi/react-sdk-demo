import {
  Scope,
  SignInWithFractal,
  useUserWallet,
} from '@fractalwagmi/react-sdk';
import { Box, Stack, Typography } from '@mui/material';
import { useState } from 'react';

export function Mint() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [symbol, setSymbol] = useState('');
  const [recipient, setRecipient] = useState('');
  const [imageBytes, setImageBytes] = useState('');
  const { data: userWallet } = useUserWallet();

  const generateMintTx = (authToken: any) => {
    if (name === '') {
      alert('must fill out name');
      return;
    }
    if (description === '') {
      alert('must fill out description');
      return;
    }
    if (symbol === '') {
      alert('must fill out symbol');
      return;
    }
    if (recipient === '') {
      alert('must fill out recipient');
      return;
    }
    if (imageBytes === '') {
      alert('must fill out imageBytes');
      return;
    }

    const options = {
      body: JSON.stringify({
        metadata: {
          creators: [
            {
              address: recipient,
              share: 90,
            },
          ],
          description: description,
          imageBytes: imageBytes,
          name: name,
          sellerFeeBasisPoints: 500,
          symbol: symbol,
        },
        payer: userWallet?.solanaPublicKeys[0],
        recipient: recipient,
      }),
      headers: {
        Authorization: 'Bearer ' + authToken,
        accept: 'application/json',
        'content-type': 'application/json',
      },
      method: 'POST',
    };

    fetch('https://api.fractal.is/sdk/v1/mint', options)
      .then(async response => response.json())
      .then(response => window.open(response.url))
      .catch(err => console.error(err));
  };

  const generateMintTxButton = () => {
    const options = {
      body: JSON.stringify({
        client_id: 'uah_xv2gE7emcl7yWtZId77SfF-aitSg',
        client_secret:
          'KByMO9P8kHTpQXZHZUblNgK6cKwvaZ_YEURbRQbI-ZDp3PPf5rxKY30jDgpPc8eF',
      }),
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
      method: 'POST',
    };

    fetch('https://auth-api.fractal.is/auth/oauth/token', options)
      .then(async response => response.json())
      .then(response => generateMintTx(response.access_token))
      .catch(err => console.error(err));
  };

  return (
    <Stack alignItems="center">
      <Stack spacing={2} px={16}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h2" m={0}>
            SDK Demo Mint on Demand ❄️
          </Typography>
          <SignInWithFractal
            scopes={[Scope.COINS_READ, Scope.IDENTIFY, Scope.ITEMS_READ]}
          />
        </Stack>
        <Typography variant="h4" m={0}>
          Mint NFT
        </Typography>
        <Box>
          Name:{' '}
          <input
            value={name}
            onChange={event => {
              setName(event.target.value);
            }}
          ></input>
          <br />
          <br />
          Symbol:{' '}
          <input
            value={symbol}
            onChange={event => {
              setSymbol(event.target.value);
            }}
          ></input>
          <br />
          <br />
          Description:
          <input
            value={description}
            onChange={event => {
              setDescription(event.target.value);
            }}
          ></input>
          <br />
          <br />
          Recipient:
          <input
            value={recipient}
            onChange={event => {
              setRecipient(event.target.value);
            }}
          ></input>
          <br />
          <br />
          Image bytes:{' '}
          <textarea
            value={imageBytes}
            onChange={event => {
              setImageBytes(event.target.value);
            }}
          ></textarea>
          <br />
          <br />
          <button onClick={() => generateMintTxButton()}>Mint</button>
        </Box>
      </Stack>
    </Stack>
  );
}
