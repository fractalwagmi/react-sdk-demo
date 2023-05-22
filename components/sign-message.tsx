import {
  useSignMessage,
  useUser,
  useUserWallet,
} from '@fractalwagmi/react-sdk';
import { Card, Dialog, Stack, Typography } from '@mui/material';
import { PublicKey } from '@solana/web3.js';
import { useRef, useState } from 'react';
import nacl from 'tweetnacl';

export const SignMessage = () => {
  const { data: user } = useUser();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { signMessage } = useSignMessage();
  const { data: walletData } = useUserWallet();
  const [decodedText, setDecodedText] = useState('');
  const [encodedSignatureForUi, setEncodedSignatureForUi] =
    useState<Uint8Array | null>();
  const [publicKeyStr, setPublicKeyStr] = useState('');
  const [verified, setVerified] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const handleButtonClick = async () => {
    const claim = textareaRef.current?.value ?? '';
    const encodedText = new Uint8Array(Buffer.from(claim, 'utf-8'));
    const { encodedSignature } = await signMessage(encodedText);
    const publicKey = new PublicKey(walletData?.solanaPublicKeys[0] ?? '');
    setDecodedText(claim);
    setEncodedSignatureForUi(encodedSignature);
    setPublicKeyStr(publicKey.toString());
    setVerified(
      nacl.sign.detached.verify(
        encodedText,
        encodedSignature,
        publicKey.toBytes(),
      ),
    );
    setShowDialog(true);
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
        marginTop: '1rem',
        padding: '1rem',
        width: 'max-content',
      }}
    >
      <span>Sign Message</span>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <textarea
          placeholder="Input message"
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
          Sign Message
        </button>
      </div>
      <Dialog open={showDialog} onClose={() => setShowDialog(false)}>
        <Card>
          <Stack spacing={1} sx={{ overflowWrap: 'break-word' }}>
            <Typography>decoded text: {decodedText}</Typography>
            <Typography>
              signature bytes: [{encodedSignatureForUi?.toString()}]
            </Typography>
            <Typography>public key: {publicKeyStr}</Typography>
            <Typography>Verified: {String(verified)}</Typography>
          </Stack>
        </Card>
      </Dialog>
    </div>
  );
};
