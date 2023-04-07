import {
  useUserWallet
} from '@fractalwagmi/react-sdk';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Stack } from '@mui/material';

import { LabelValue } from 'components/marketplace/label-value';

const storefrontMint = async (walletPublicKey, itemId) => {
  const options = {
    body: JSON.stringify({
      walletPublicKey: walletPublicKey,
      itemId: itemId
    }),
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
    method: 'POST',
  };

  try {
    const resp = await fetch('/api/storefront-mint', options);
    const data = await resp.json();

    if (data.url == '') {
      throw new Error('something went wrong');
      return;
    }

    window.open(data.url)
  } catch (e) {
    alert(e);
  }
};

export const ForSaleStorefrontItem = ({ item }) => {
  const { data: userWallet } = useUserWallet();

  return (
    <Stack p={2} border="1px solid" borderColor="divider" spacing={1}>
      <Box
        component="img"
        alt=""
        sx={{
          width: '100%',
        }}
        src={item.metadata.imageUrl}
      />
      <LabelValue label="Name">{item.metadata.name}</LabelValue>
      <LabelValue label="Token address">{item.id}</LabelValue>
      <LabelValue label="Price">
        {item.price?.amount} {item.price?.unit}
      </LabelValue>
      <Box textAlign="center">
        <LoadingButton
          variant="outlined"
          onClick={async () => {
            storefrontMint(userWallet?.solanaPublicKeys[0], item.id)
          }}
        >
          Buy
        </LoadingButton>
      </Box>
    </Stack>
  );
};
