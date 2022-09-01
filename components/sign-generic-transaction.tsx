import { useSignTransaction, useUser } from '@fractalwagmi/fractal-sdk';
import { useState } from 'react';

export const SignGenericTransaction = () => {
  const { data: user } = useUser();
  const { signTransaction } = useSignTransaction();
  const [unsignedTransactionB58, setUnsignedTransactionB58] = useState('');

  const handleButtonClick = async () => {
    if (!unsignedTransactionB58) {
      return;
    }

    try {
      signTransaction(unsignedTransactionB58);
      // eslint-disable-next-line no-console
      console.log('Transaction signed');
    } catch (err: unknown) {
      // eslint-disable-next-line no-console
      console.error('err signing transaction. err = ', err);
    }
  };

  if (!user) {
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
      <span>Sign Generic Transaction</span>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <textarea
          placeholder="Input unsigned transaction b58"
          onChange={e => setUnsignedTransactionB58(e.target.value)}
          style={{
            padding: '0.5rem 1rem',
            width: '500px',
          }}
          rows={5}
        ></textarea>
        <button
          style={{ padding: '0.5rem 1rem', width: 'max-content' }}
          onClick={handleButtonClick}
          disabled={unsignedTransactionB58.trim() === ''}
        >
          Sign Transaction
        </button>
      </div>
    </div>
  );
};
