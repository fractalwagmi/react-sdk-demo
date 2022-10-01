import {
  Scope,
  SignInWithFractal,
  useItems,
  useItemsForSale,
} from '@fractalwagmi/react-sdk';
import { Box, Grid, Stack, Typography } from '@mui/material';

import { ForSaleItem } from 'components/marketplace/for-sale-item';
import { WalletItem } from 'components/marketplace/wallet-item';

export function Marketplace() {
  const { data: myItems } = useItems();
  const { data: forSaleItems } = useItemsForSale({
    limit: 20,
    sortDirection: 'ASCENDING',
    sortField: 'PRICE',
  });

  return (
    <Stack alignItems="center">
      <Stack spacing={2} px={16}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h2" m={0}>
            SDK Demo Marketplace ❄️
          </Typography>
          <SignInWithFractal
            scopes={[Scope.COINS_READ, Scope.IDENTIFY, Scope.ITEMS_READ]}
          />
        </Stack>
        <Typography variant="h4" m={0}>
          My Items
        </Typography>
        <Box>
          <Grid container spacing={4} width="100%">
            {myItems?.map(item => (
              <Grid item key={item.id} xs={6} sm={4} md={3}>
                <WalletItem item={item} />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Typography variant="h4" m={0}>
          Items for sale
        </Typography>
        <Box>
          <Grid container spacing={4} width="100%">
            {forSaleItems?.map(item => (
              <Grid item key={item.id} xs={6} sm={4} md={3}>
                <ForSaleItem item={item} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Stack>
    </Stack>
  );
}
