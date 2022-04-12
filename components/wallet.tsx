import { FractalWallet, useSolBalance } from '@fractalwagmi/fractal-sdk';
import { useState } from 'react';
export function Wallet() {
  const [userId, setUserId] = useState<string | undefined>();
  const [publicKey, setPublicKey] = useState<string | undefined>();
  const [username, setUsername] = useState<string | undefined>();
  const sol = useSolBalance();

  return (
    <div>
      <div style={{ marginTop: '1rem' }}>
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
      <div>{sol?.balance}</div>
    </div>
  );
}
