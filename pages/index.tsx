import { WalletProvider } from '@fractalwagmi/fractal-sdk';
import Head from 'next/head';

import { Wallet } from 'components/wallet';

const IndexPage = () => {
  if (typeof window === 'undefined') {
    return <></>;
  }

  return (
    <div>
      <Head>
        <title>SDK Demo Game</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <h1>SDK Demo Game ❄️</h1>
      <div>
        <WalletProvider>
          <Wallet />
        </WalletProvider>
      </div>
    </div>
  );
};

export default IndexPage;
