import { useSignTransaction, useUserWallet } from '@fractalwagmi/fractal-sdk';
import {
  Connection,
  PublicKey,
  SystemProgram,
  Transaction,
} from '@solana/web3.js';
import base58 from 'bs58';
import { useState } from 'react';

export const SendSOL = () => {
  const { data: userWallet } = useUserWallet();
  const [unsignedTransactionB58, setUnsignedTransactionB58] = useState('');
  const { data: signature, error } = useSignTransaction({
    unsignedTransactionB58,
  });

  console.log('SendSOL');
  console.log('sign-transaction signature = ', signature);
  console.log('sign-transaction error = ', error);

  const connection = new Connection('https://api.mainnet-beta.solana.com');

  const handleButtonClick = async () => {
    if (!userWallet) {
      console.log('Wallet not loaded yet.');
      return;
    }

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

    const transactionb58 = base58.encode(transaction.serializeMessage());

    console.log('transactionb58 = ', transactionb58);

    setUnsignedTransactionB58(transactionb58);
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
