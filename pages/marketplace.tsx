import '@fractalwagmi/react-sdk/styles.css';

import { FractalProvider } from '@fractalwagmi/react-sdk';
import Head from 'next/head';
import { useEffect, useState } from 'react';

import { Marketplace } from 'components/marketplace';

const CLIENT_ID = 'e0zyZpK7ojL5ozFD1Kww1APjsMePdj99FX3StE';

const MarketplacePage = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
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
        <FractalProvider clientId={CLIENT_ID}>
          <Marketplace />
        </FractalProvider>
      </div>
    </div>
  );
};

export default MarketplacePage;
