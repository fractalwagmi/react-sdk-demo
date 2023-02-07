import '@fractalwagmi/react-sdk/styles.css';

import { FractalProvider } from '@fractalwagmi/react-sdk';
import Head from 'next/head';
import { useEffect, useState } from 'react';

import { Mint } from 'components/mint';

const CLIENT_ID = 'e0zyZpK7ojL5ozFD1Kww1APjsMePdj99FX3StE';

const MintPage = () => {
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
        <title>SDK Demo Mint</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <FractalProvider clientId={CLIENT_ID}>
        <Mint />
      </FractalProvider>
    </div>
  );
};

export default MintPage;
