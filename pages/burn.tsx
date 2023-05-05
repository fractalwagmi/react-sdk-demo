import '@fractalwagmi/react-sdk/styles.css';

import { FractalProvider } from '@fractalwagmi/react-sdk';
import Head from 'next/head';
import { useEffect, useState } from 'react';

import { Burn } from 'components/burn';

const BurnPage = () => {
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
        <title>SDK Demo Burn</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <FractalProvider clientId={'DjsEudETLx5uDMwAVzeUZZrwbGWIaOhH'}>
        <Burn />
      </FractalProvider>
    </div>
  );
};

export default BurnPage;
