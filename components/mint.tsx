import {
  Scope,
  SignInWithFractal,
  useUserWallet,
  useUser,
} from '@fractalwagmi/react-sdk';
import { Box, Stack, Typography } from '@mui/material';
import { useState } from 'react';

export function Mint() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [symbol, setSymbol] = useState('');
  const [recipient, setRecipient] = useState('');
  const [imageBytes, setImageBytes] = useState('');
  const [attributes_date, setAttributesDate] = useState('');
  const [attributes_game, setAttributesGame] = useState('');
  const [attributes_position, setAttributesPosition] = useState('');
  const [attributes_season, setAttributesSeason] = useState('');
  const { data: userWallet } = useUserWallet();
  const { data: user } = useUser();

  const generateMintTxButton = async () => {
    const options = {
      body: JSON.stringify({
        attributes: {
          date: attributes_date,
          game: attributes_game,
          position: attributes_position,
          season: attributes_season,
        },
        description: description,
        email: user?.email,
        imageBytes: imageBytes,
        name: name,
        payer: userWallet?.solanaPublicKeys[0],
        recipient: recipient,
        symbol: symbol,
      }),
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
      method: 'POST',
    };

    try {
      const resp = await fetch('/api/mint', options);
      const data = await resp.json();

      if (data.url == '') {
        throw new Error('something went wrong');
        return;
      }

      window.open(data.url);
    } catch (e: unknown) {
      alert(e);
    }
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
          Attributes:
          <br />
          <br />
          Game:
          <input
            value={attributes_game}
            onChange={event => {
              setAttributesGame(event.target.value);
            }}
          ></input>
          <br />
          Date:
          <input
            value={attributes_date}
            onChange={event => {
              setAttributesDate(event.target.value);
            }}
          ></input>
          <br />
          Season:
          <input
            value={attributes_season}
            onChange={event => {
              setAttributesSeason(event.target.value);
            }}
          ></input>
          <br />
          Position:
          <input
            value={attributes_position}
            onChange={event => {
              setAttributesPosition(event.target.value);
            }}
          ></input>
          <br />
          <br />
          <button onClick={async () => generateMintTxButton()}>Mint</button>
        </Box>
      </Stack>
    </Stack>
  );
}
