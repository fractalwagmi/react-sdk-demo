import {
  ForSaleItem as ForSaleItemData,
  useBuyItem,
} from '@fractalwagmi/react-sdk';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Stack } from '@mui/material';
import { useState } from 'react';

import { LabelValue } from 'components/marketplace/label-value';

export const ForSaleItem = ({ item }: { item: ForSaleItemData }) => {
  const { buyItem } = useBuyItem();
  const [buying, setBuying] = useState(false);

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
            setBuying(true);
            try {
              const { signature } = await buyItem({ tokenAddress: item.id });
              console.log('bought. signature = ', signature);
            } catch (err: unknown) {
              console.log('an error occurred. err = ', err);
            }
            setBuying(false);
          }}
        >
          Buy
        </LoadingButton>
      </Box>
    </Stack>
  );
};
