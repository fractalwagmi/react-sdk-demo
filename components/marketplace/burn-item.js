import {
    useUserWallet, useSignTransaction
  } from '@fractalwagmi/react-sdk';
  import LoadingButton from '@mui/lab/LoadingButton';
  import { Box, Stack } from '@mui/material';
  
  import { LabelValue } from 'components/marketplace/label-value';
  
  const burnNFT = async (walletPublicKey, itemId) => {
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
      const resp = await fetch('/api/burn', options);
      const data = await resp.json();
  
      if (data.transactionBase58 == '') {
        throw new Error('something went wrong');
        return;
      }
  
      return data.transactionBase58
    } catch (e) {
      alert(e);
    }
  };
  
  export const BurnItem = ({ item }) => {
    const { data: userWallet } = useUserWallet();
    const { signTransaction } = useSignTransaction();
  
    return (
      <Stack p={2} border="1px solid" borderColor="divider" spacing={1}>
        <Box
          component="img"
          alt=""
          sx={{
            width: '100%',
          }}
          src={item.files[0].uri}
        />
        <LabelValue label="Name">{item.name}</LabelValue>
        <Box textAlign="center">
          <LoadingButton
            variant="outlined"
            onClick={async () => {
              var tx = await burnNFT(userWallet?.solanaPublicKeys[0], item.id)
              signTransaction(tx)
            }}
          >
            Burn 🔥
          </LoadingButton>
        </Box>
      </Stack>
    );
  };
  