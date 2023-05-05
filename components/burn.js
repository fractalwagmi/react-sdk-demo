import { Scope, SignInWithFractal, useItems, FractalSdkCommonChain } from '@fractalwagmi/react-sdk';
import { Box, Grid, Stack, Typography } from '@mui/material';
import { BurnItem } from 'components/marketplace/burn-item';


export function Burn() {
  const { data: items } = useItems();

  console.log(items)

  return (
    <Stack alignItems="center">
      <Stack spacing={2} px={16}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h2" m={0}>
            SDK Demo Burn 🔥
          </Typography>
          <SignInWithFractal
            scopes={[Scope.COINS_READ, Scope.IDENTIFY, Scope.ITEMS_READ]}
          />
        </Stack>
        <Typography variant="h4" m={0}>
          My NFTs
        </Typography>
        <Box>
        <Grid container spacing={4} width="100%">
            {items?.map(item => (
              <Grid item key={item.id} xs={6} sm={4} md={3}>
                <BurnItem item={item} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Stack>
    </Stack>
  );
}
