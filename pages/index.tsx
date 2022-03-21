import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';

const IndexPage = () => {
  const [userId, setUserId] = useState<string | undefined>();
  const ref = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    window.addEventListener('message', event => {
      if (event.data.event === 'loggedIn') {
        setUserId(event.data.userId);
      }
      if (event.data.event === 'loggedOut') {
        setUserId(undefined);
      }
    });
  }, []);

  const registerKill = async () => {
    fetch('/api/score', {
      body: JSON.stringify({ userId }),
      headers: {
        /*eslint-disable */
        'Content-Type': 'application/json',
        /*eslint-enable */
      },
      method: 'POST',
    });
  };

  const doLogin = () => {
    ref?.current?.contentWindow?.postMessage({ event: 'login' }, '*');
  };
  console.log();

  return (
    <div>
      <Head>
        <title>SDK Demo Game</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <h1>SDK Demo Game ❄️</h1>
      <div style={{ marginTop: '1rem' }}>
        <button onClick={doLogin}>Login with Fractal</button>
      </div>
      <div style={{ marginTop: '1rem' }}>
        <iframe
          ref={ref}
          frameBorder={0}
          width={280}
          height={40}
          src={
            window.location.origin.includes('http://localhost')
              ? 'http://localhost:3000/iframe'
              : 'https://fractal-git-wallet-auth.fractalpreview.com/iframe'
          }
        />
      </div>
      <div style={{ marginTop: '1rem' }}>userId</div>
      <div>{userId}</div>
      <div style={{ marginTop: '1rem' }}>
        {userId && <button onClick={registerKill}>Kill someone</button>}
      </div>
    </div>
  );
};

export default IndexPage;
