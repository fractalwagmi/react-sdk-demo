import { WalletProvider } from '@fractalwagmi/fractal-sdk';
import Head from 'next/head';

import { Marketplace } from 'components/marketplace';

const MarketplacePage = () => {
  if (typeof window === 'undefined') {
    return <></>;
  }

  return (
    <div>
      <Head>
        <title>SDK Demo Marketplace</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <h1>SDK Demo Marketplace ❄️</h1>
      <div>
        <WalletProvider>
          <Marketplace />
        </WalletProvider>
      </div>
    </div>
  );
};

export default MarketplacePage;
