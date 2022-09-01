import { FractalProvider } from '@fractalwagmi/fractal-sdk';
import dynamic from 'next/dynamic';
import Head from 'next/head';

const CLIENT_ID = 'e0zyZpK7ojL5ozFD1Kww1APjsMePdj99FX3StE';

const FractalWallet = dynamic<Record<never, never>>(
  async () => import('components/wallet').then(mod => mod.Wallet),
  {
    ssr: false,
  },
);

const IndexPage = () => {
  return (
    <div>
      <Head>
        <title>SDK Demo Game</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <h1>SDK Demo Game ❄️</h1>
      <div>
        <FractalProvider clientId={CLIENT_ID}>
          <FractalWallet />
        </FractalProvider>
      </div>
    </div>
  );
};

export default IndexPage;
