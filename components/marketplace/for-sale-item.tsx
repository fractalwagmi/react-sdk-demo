import {
  ForSaleItem as ForSaleItemData,
  useBuyItem,
  useWaitForTransactionStatus,
  TransactionStatus,
} from '@fractalwagmi/react-sdk';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Stack, Typography } from '@mui/material';
import { useState } from 'react';

import { LabelValue } from 'components/marketplace/label-value';

export const ForSaleItem = ({ item }: { item: ForSaleItemData }) => {
  const { buyItem } = useBuyItem();
  const [buying, setBuying] = useState(false);
  const [txStatus, setTxStatus] = useState<null | TransactionStatus>(null);
  const { waitForTransactionStatus } = useWaitForTransactionStatus();

  return (
    <Stack p={2} border="1px solid" borderColor="divider" spacing={1}>
      <Box
        component="img"
        alt=""
        sx={{
          width: '100%',
        }}
        src={item.imageUrl}
      />
      <LabelValue label="Name">{item.name}</LabelValue>
      <LabelValue label="Token address">{item.id}</LabelValue>
      <LabelValue label="Listed at">{item.listTime?.time}</LabelValue>
      <LabelValue label="Price">
        {item.price?.amount} {item.price?.unit}
      </LabelValue>
      <Box textAlign="center">
        <LoadingButton
          loading={buying}
          variant="outlined"
          onClick={async () => {
            let signature = '';
            setBuying(true);
            try {
              signature = (await buyItem({ tokenAddress: item.id })).signature;
              console.log('bought. signature = ', signature);
            } catch (err: unknown) {
              console.log('an error occurred. err = ', err);
            }
            setBuying(false);

            try {
              setTxStatus(TransactionStatus.PENDING);
              const status = await waitForTransactionStatus(signature);
              setTxStatus(status);
            } catch (err: unknown) {
              console.log(
                'an error occurred while waiting for tx to post',
                err,
              );
            }
          }}
        >
          Buy
        </LoadingButton>
      </Box>
      {txStatus !== null && (
        <Typography variant="body1">Transaction Status: {txStatus}</Typography>
      )}
    </Stack>
  );
};
