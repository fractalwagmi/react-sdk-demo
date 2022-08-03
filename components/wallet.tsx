// import { FractalWallet, useSolBalance } from '@fractalwagmi/fractal-sdk';
import { useEffect, useState } from 'react';

interface UserInfo {
  accountPublicKey: string;
  email: string;
  username: string;
}

export function Wallet() {
  const [url, setUrl] = useState('');
  const [code, setCode] = useState('');
  const [userToken, setUserToken] = useState('');
  const [userId, setUserId] = useState('');
  const [items, setItems] = useState([]);
  const [info, setInfo] = useState<UserInfo>();
  const [coins, setCoins] = useState([]);
  // const [userId, setUserId] = useState<string | undefined>();
  // const [publicKey, setPublicKey] = useState<string | undefined>();
  // const [username, setUsername] = useState<string | undefined>();
  // const sol = useSolBalance();

  useEffect(() => {
    const getUrl = async () => {
      const result = await fetch(
        'https://auth-api.fractal.is/auth/v2/approval/geturl?clientId=e0zyZpK7ojL5ozFD1Kww1APjsMePdj99FX3StE&scope=items:read&scope=coins:read&scope=identify',
      );
      const approvals = await result.json();
      setUrl(approvals.url);
      setCode(approvals.code);
    };
    getUrl();
  }, []);

  useEffect(() => {
    const pollCode = async () => {
      if (code) {
        const interval = setInterval(async () => {
          const res = await fetch(
            `https://auth-api.fractal.is/auth/v2/approval/result`,
            {
              body: JSON.stringify({
                clientId: 'e0zyZpK7ojL5ozFD1Kww1APjsMePdj99FX3StE',
                code,
              }),
              method: 'POST',
            },
          );
          if (!res.ok) {
            if (res.status === 401) {
              return;
            } else {
              clearInterval(interval);
            }
          }
          const response = await res.json();
          if (response) {
            setUserToken(response.bearerToken);
            setUserId(response.userId);
            clearInterval(interval);
          }
        }, 3000);
      }
    };
    pollCode();
  }, [code]);

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
    const getInfo = async () => {
      if (userToken) {
        const res = await fetch(`https://api.fractal.is/sdk/v1/wallet/info`, {
          headers: { authorization: `Bearer ${userToken}` },
        });
        if (!res.ok) {
          return;
        }
        const response = await res.json();
        if (response) {
          setInfo(response);
        }
      }
    };
    const getCoins = async () => {
      if (userToken) {
        const res = await fetch(`https://api.fractal.is/sdk/v1/wallet/coins`, {
          headers: { authorization: `Bearer ${userToken}` },
        });
        if (!res.ok) {
          return;
        }
        const response = await res.json();
        if (response) {
          setCoins(response.coins);
        }
      }
    };
    getItems();
    getInfo();
    getCoins();
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
      <div style={{ marginTop: '1rem' }}>
        {userToken && <div>User token: {userToken}</div>}
        {userId && <div>User id: {userId}</div>}
      </div>
      <div style={{ marginTop: '1rem' }}>
        <div>{info?.accountPublicKey}</div>
        <div>{info?.email}</div>
        <div>{info?.username}</div>
      </div>
      <div style={{ marginTop: '1rem' }}>
        {coins.map((c: any) => (
          <div key={c.symbol}>
            {c.uiAmount} {c.symbol}
          </div>
        ))}
      </div>
      <div style={{ marginTop: '1rem' }}>
        {items.map((i: any) => (
          <div key={i.id}>
            <img alt="" width="300" src={i.files[0].uri} />
            <div>{i.name}</div>
            <div>{i.id}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
