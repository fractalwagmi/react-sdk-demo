import { useSignTransaction, useUserWallet } from '@fractalwagmi/fractal-sdk';
import {
  Connection,
  PublicKey,
  SystemProgram,
  Transaction,
} from '@solana/web3.js';
import base58 from 'bs58';

export const SendSOL = () => {
  const { data: userWallet } = useUserWallet();
  const { signTransaction } = useSignTransaction();

  const connection = new Connection('https://api.mainnet-beta.solana.com');

  const handleButtonClick = async () => {
    const blockhash = (await connection.getLatestBlockhash('finalized'))
      .blockhash;

    const fromPublickey = new PublicKey(userWallet.solanaPublicKeys[0]);
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

    const unsignedTransactionB58 = base58.encode(
      transaction.serializeMessage(),
    );

    try {
      signTransaction(unsignedTransactionB58);
      // eslint-disable-next-line no-console
      console.log('Transaction signed');
    } catch (err: unknown) {
      // eslint-disable-next-line no-console
      console.error('err signing transaction. err = ', err);
    }
  };

  if (!userWallet) {
    return null;
  }

  return (
    <div
      style={{
        border: '1px solid #ddd',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        padding: '1rem',
        width: 'max-content',
      }}
    >
      <span>Send SOL Example</span>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <button
          style={{ padding: '0.5rem 1rem', width: 'max-content' }}
          onClick={handleButtonClick}
        >
          Send SOL
        </button>
      </div>
    </div>
  );
};
