import Link from 'next/link';
import { useEffect, useState } from 'react';

import Layout from 'components/main';

const IndexPage = () => {
  const [userId, setUserId] = useState<string | undefined>();

  useEffect(() => {
    window.addEventListener('message', event => {
      if (event.data) {
        setUserId(event.data.userId);
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

  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <h1>Hello Next.js 👋</h1>
      <iframe width={700} height={700} src={'http://localhost:3000/iframe'} />
      <div>userId</div>
      <div>{userId}</div>
      {userId && <button onClick={registerKill}>Kill someone</button>}
      <p>
        <Link href="/about">
          <a>About</a>
        </Link>
      </p>
    </Layout>
  );
};

export default IndexPage;
