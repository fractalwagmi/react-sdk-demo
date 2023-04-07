import { Scope, SignInWithFractal } from '@fractalwagmi/react-sdk';
import { Box, Grid, Stack, Typography } from '@mui/material';
import { useState, useEffect } from 'react';

import { ForSaleStorefrontItem } from 'components/marketplace/for-sale-storefront-item';

export function Storefront() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getStorefrontItems = async () => {
      const options = {
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
        },
        method: 'GET',
      };

      try {
        const resp = await fetch('/api/storefront-items', options);
        const data = await resp.json();

        if (data.items == '') {
          throw new Error('something went wrong');
          return;
        }

        setItems(data.items);
      } catch (e) {
        alert(e);
      }
    };

    getStorefrontItems();
  }, []);

  return (
    <Stack alignItems="center">
      <Stack spacing={2} px={16}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h2" m={0}>
            SDK Demo Storefront ❄️
          </Typography>
          <SignInWithFractal
            scopes={[Scope.COINS_READ, Scope.IDENTIFY, Scope.ITEMS_READ]}
          />
        </Stack>
        <Typography variant="h4" m={0}>
          Items for sale
        </Typography>
        <Box>
          <Grid container spacing={4} width="100%">
            {items?.map(item => (
              <Grid item key={item.id} xs={6} sm={4} md={3}>
                <ForSaleStorefrontItem item={item} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Stack>
    </Stack>
  );
}
