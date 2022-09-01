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
import {
  Connection,
  PublicKey,
  SystemProgram,
  Transaction,
} from '@solana/web3.js';
import { binary_to_base58 } from 'base58-js';
const CLIENT_ID = 'e0zyZpK7ojL5ozFD1Kww1APjsMePdj99FX3StE';

export function Wallet() {
  const { data: user } = useUser();
  const { data: userWallet } = useUserWallet();
  const { data: coins } = useCoins();
  const { data: items } = useItems();

  const connection = new Connection('https://api.mainnet-beta.solana.com');

  const generateTransaction = async () => {
    const blockhash = (await connection.getLatestBlockhash('finalized'))
      .blockhash;

    const fromPublickey = new PublicKey(userWallet?.solanaPublicKeys[0]);
    const toPublickey = new PublicKey(
      'BDrA9BYVeFap3wjvZEVMRkvgj2YXwRU7SK8Vr28bzdgf',
    );
    const transaction = new Transaction();

    transaction.add(
      SystemProgram.transfer({
        fromPubkey: fromPublickey,
        lamports: 100000,
        toPubkey: toPublickey,
      }),
    );
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = fromPublickey;

    const unsignedTx = binary_to_base58(transaction.serializeMessage());

    // TODO: replace with SDK transaction sign function when ready
    const options = {
      body: JSON.stringify({
        clientId: 'e0zyZpK7ojL5ozFD1Kww1APjsMePdj99FX3StE',
        unsigned: unsignedTx,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    };

    fetch('https://auth-api.fractal.is/auth/v2/transaction/authorize', options)
      .then(async response => response.json())
      .then(response => window.open(response.url))
      .catch(err => console.error(err));
  };

  return (
    <div>
      <SignInWithFractal
        clientId={CLIENT_ID}
        scopes={[Scope.IDENTIFY, Scope.COINS_READ, Scope.ITEMS_READ]}
      ></SignInWithFractal>
      <div style={{ marginTop: '1rem' }}>
        {user && <div>User id: {user.userId}</div>}
      </div>
      <button onClick={generateTransaction}>Send SOL</button>
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
