import {
  Coin,
  FractalSDKError,
  Item,
  Scope,
  SignInWithFractal,
  useCoins,
  useItems,
  useUser,
  useUserWallet,
} from '@fractalwagmi/react-sdk';

import { SignGenericTransaction } from 'components/sign-generic-transaction';

export function Wallet() {
  const { data: user } = useUser();
  const { data: userWallet } = useUserWallet();
  const { data: coins } = useCoins();
  const { data: items } = useItems();

  return (
    <div>
      <SignInWithFractal
        scopes={[Scope.IDENTIFY, Scope.COINS_READ, Scope.ITEMS_READ]}
        onSuccess={() => console.log('SignInWtihFractal onSuccess')}
        onError={(err: FractalSDKError) => {
          console.log('SignInWtihFractal onError err = ', err);
        }}
        onSignOut={() => console.log('SignInWtihFractal onSignOut')}
      ></SignInWithFractal>
      <div style={{ marginTop: '1rem' }}>
        {user && <div>User id: {user.userId}</div>}
      </div>
      <div style={{ marginTop: '1rem' }}>
        <div>Solana Public Key: {userWallet?.solanaPublicKeys[0]}</div>
        <div>Email: {user?.email}</div>
        <div>Username: {user?.username}</div>
      </div>
      <SignGenericTransaction />
      <h1>Coins</h1>
      <div style={{ marginTop: '1rem' }}>
        {coins.map((c: Coin) => (
          <div key={c.symbol}>
            {c.uiAmount} {c.symbol}
          </div>
        ))}
      </div>
      <h1>Items</h1>
      <div style={{ marginTop: '1rem' }}>
        {items.map((i: Item) => (
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
