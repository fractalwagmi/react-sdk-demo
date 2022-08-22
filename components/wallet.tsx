import {
  SignInWithFractal,
  useUser,
  useUserWallet,
  useCoins,
  useItems,
  Scope,
  Coin,
  Item,
} from '@fractalwagmi/fractal-sdk';

const CLIENT_ID = 'e0zyZpK7ojL5ozFD1Kww1APjsMePdj99FX3StE';

export function Wallet() {
  const { data: user } = useUser();
  const { data: userWallet } = useUserWallet();
  const { data: coins } = useCoins();
  const { data: items } = useItems();

  return (
    <div>
      <SignInWithFractal
        clientId={CLIENT_ID}
        scopes={[Scope.IDENTIFY, Scope.COINS_READ, Scope.ITEMS_READ]}
      ></SignInWithFractal>
      <div style={{ marginTop: '1rem' }}>
        {user && <div>User id: {user.userId}</div>}
      </div>
      <div style={{ marginTop: '1rem' }}>
        <div>Solana Public Key: {userWallet?.solanaPublicKeys[0]}</div>
        <div>Email: {user?.email}</div>
        <div>Username: {user?.username}</div>
      </div>
      <div style={{ marginTop: '1rem' }}>
        {coins.map((c: Coin) => (
          <div key={c.symbol}>
            {c.uiAmount} {c.symbol}
          </div>
        ))}
      </div>
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
