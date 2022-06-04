// import { FractalWallet, useSolBalance } from '@fractalwagmi/fractal-sdk';
import { useEffect, useState } from 'react';
export function Wallet() {
  const [url, setUrl] = useState('');
  const [code, setCode] = useState('');
  const [token, setToken] = useState('');
  const [userToken, setUserToken] = useState('');
  const [userId, setUserId] = useState('');
  const [items, setItems] = useState([]);
  // const [userId, setUserId] = useState<string | undefined>();
  // const [publicKey, setPublicKey] = useState<string | undefined>();
  // const [username, setUsername] = useState<string | undefined>();
  // const sol = useSolBalance();

  useEffect(() => {
    const getUrl = async () => {
      const result = await fetch(
        'https://auth-api.fractal.is/auth/oauth/token',
        {
          body: JSON.stringify({
            client_id: 'e0zyZpK7ojL5ozFD1Kww1APjsMePdj99FX3StE',
            client_secret:
              'mdGt8On3Sh08CjNf8IY5mQkiKbFiCQmsJyWghR1Ke16btEajrMDUqP2F5AYCWSlVKlJVhcsUZnbg4S4W3oSg',
          }),
          method: 'POST',
        },
      );
      const token = await result.json();
      setToken(token.access_token);

      const res = await fetch(
        'https://auth-api.fractal.is/auth/approval/geturl',
        {
          headers: { authorization: `Bearer ${token.access_token}` },
          method: 'POST',
        },
      );
      const response = await res.json();

      setUrl(response.url);
      setCode(response.code);
    };
    getUrl();
  }, []);

  useEffect(() => {
    const pollCode = async () => {
      if (code && token) {
        const interval = setInterval(async () => {
          const res = await fetch(
            `https://auth-api.fractal.is/auth/approval/result?code=${code}`,
            {
              headers: { authorization: `Bearer ${token}` },
              method: 'POST',
            },
          );
          if (!res.ok) {
            clearInterval(interval);
          }
          const response = await res.json();
          if (response) {
            setUserToken(response.bearer_token);
            setUserId(response.user_id);
            clearInterval(interval);
          }
        }, 3000);
      }
    };
    pollCode();
  }, [code, token]);

  useEffect(() => {
    const getItems = async () => {
      if (userToken) {
        const res = await fetch(`https://api.fractal.is/sdk/v1/wallet/items`, {
          headers: { authorization: `Bearer ${userToken}` },
        });
        if (!res.ok) {
          return;
        }
        const response = await res.json();
        if (response) {
          setItems(response.items);
        }
      }
    };
    getItems();
  }, [userToken]);

  return (
    <div>
      {/* <div style={{ marginTop: '1rem' }}>
        <FractalWallet
          onLogin={user => {
            setUserId(user.userId);
            setPublicKey(user.publicKey);
            setUsername(user.username);
            console.log(user);
          }}
          onLogout={() => {
            console.log('logged out');
          }}
          ready={() => {
            console.log('ready');
          }}
        />
      </div>
      <div style={{ marginTop: '1rem' }}>userId</div>
      <div>{userId}</div>
      <div style={{ marginTop: '1rem' }}>publicKey</div>
      <div>{publicKey}</div>
      <div style={{ marginTop: '1rem' }}>username</div>
      <div>{username}</div>
      <div style={{ marginTop: '1rem' }}>balance</div>
      <div>{sol?.balance}</div> */}
      <a href={url} target="_blank" rel="noreferrer">
        Sign in with Fractal
      </a>
      {userToken && <div>User token: {userToken}</div>}
      {userId && <div>User id: {userId}</div>}
      {/* @ts-ignore */}
      {items.map((i: any) => (
        <div key={i.id}>
          <img alt="" width="300" src={i.files[0].uri} />
          <div>{i.name}</div>
          <div>{i.id}</div>
        </div>
      ))}
    </div>
  );
}
