import { useSignTransaction, useUser } from '@fractalwagmi/fractal-sdk';
import { useRef } from 'react';

export const SignGenericTransaction = () => {
  const { data: user } = useUser();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { signTransaction } = useSignTransaction();

  const handleButtonClick = async () => {
    signTransaction(textareaRef.current?.value ?? '');
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
          ref={textareaRef}
          style={{
            padding: '0.5rem 1rem',
            width: '500px',
          }}
          rows={5}
        ></textarea>
        <button
          style={{ padding: '0.5rem 1rem', width: 'max-content' }}
          onClick={handleButtonClick}
        >
          Sign Transaction
        </button>
      </div>
    </div>
  );
};
