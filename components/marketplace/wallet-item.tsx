import {
  Item,
  TransactionStatus,
  useCancelListItem,
  useListItem,
  useWaitForTransactionStatus,
} from '@fractalwagmi/react-sdk';
import CloseIcon from '@mui/icons-material/Close';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  Typography,
  Box,
  Stack,
  Dialog,
  InputAdornment,
  OutlinedInput,
  FormControl,
  FormHelperText,
  IconButton,
} from '@mui/material';
import { useState } from 'react';

import { LabelValue } from 'components/marketplace/label-value';

export const WalletItem = ({ item }: { item: Item }) => {
  const [transacting, setTransacting] = useState(false);
  const [tokenAddressToList, setTokenAddressToList] = useState('');
  const [priceInput, setPriceInput] = useState('');
  const { listItem } = useListItem();
  const { cancelListItem } = useCancelListItem();
  const [txStatus, setTxStatus] = useState<null | TransactionStatus>(null);
  const { waitForTransactionStatus } = useWaitForTransactionStatus();

  const checkStatus = async (signature: string) => {
    try {
      setTxStatus(TransactionStatus.PENDING);
      const status = await waitForTransactionStatus(signature);
      setTxStatus(status);
    } catch (err: unknown) {
      console.log('An error occurred while checking tx status', err);
    }
    resetStatusAfterTimeout();
  };

  const resetStatusAfterTimeout = () => {
    setTimeout(() => {
      setTxStatus(null);
    }, 3000);
  };

  const handleListOrUnlistClick = async () => {
    if (item.isForSale) {
      setTransacting(true);
      try {
        const { signature } = await cancelListItem({
          tokenAddress: item.id,
        });
        console.log('cancelled. signature = ', signature);
        checkStatus(signature);
      } catch (err: unknown) {
        console.log('an error occurred. err = ', err);
      }
      setTransacting(false);
    } else {
      setTokenAddressToList(item.id);
    }
  };

  const handleListConfirmationClick = async (tokenAddress: string) => {
    if (!priceInput) {
      throw new Error(`expected price to be defined but got ${priceInput}`);
    }
    try {
      const { signature } = await listItem({ price: priceInput, tokenAddress });
      console.log('listed. signature = ', signature);
      checkStatus(signature);
    } catch (err: unknown) {
      console.log('an error occurred. err = ', err);
    }
  };

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
      <LabelValue label="Token address">{item.id}</LabelValue>
      <Box textAlign="center">
        <LoadingButton
          loading={transacting}
          variant="outlined"
          onClick={handleListOrUnlistClick}
        >
          {item.isForSale ? 'Unlist' : 'List for sale'}
        </LoadingButton>
      </Box>
      <Dialog
        open={Boolean(tokenAddressToList)}
        onClose={() => setTokenAddressToList('')}
      >
        <Stack p={2} spacing={2} maxWidth="400px">
          <Stack justifyContent="space-between" direction="row">
            <Typography variant="h6">List Item</Typography>
            <IconButton onClick={() => setTokenAddressToList('')}>
              <CloseIcon />
            </IconButton>
          </Stack>
          <Box
            component="img"
            alt=""
            sx={{
              width: '100%',
            }}
            src={item.files[0].uri}
          />
          <LabelValue label="Token address">{tokenAddressToList}</LabelValue>
          <FormControl>
            <OutlinedInput
              onChange={e => setPriceInput(e.target.value ?? '')}
              value={priceInput}
              endAdornment={<InputAdornment position="end">SOL</InputAdornment>}
            ></OutlinedInput>
            <FormHelperText>Price</FormHelperText>
          </FormControl>
          <LoadingButton
            loading={transacting}
            disabled={!priceInput}
            variant="contained"
            onClick={async () =>
              handleListConfirmationClick(tokenAddressToList)
            }
          >
            List item
          </LoadingButton>
          {txStatus !== null && (
            <Typography variant="body1">
              Transaction Status: {txStatus}
            </Typography>
          )}
        </Stack>
      </Dialog>
    </Stack>
  );
};
