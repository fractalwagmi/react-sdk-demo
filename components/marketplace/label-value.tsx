import { Stack, Typography } from '@mui/material';
import { ReactChild } from 'react';

export const LabelValue: React.FC<{ label: ReactChild }> = ({
  children,
  label,
}) => {
  return (
    <Stack direction="column">
      <Typography component="span" variant="caption">
        {label}
      </Typography>
      <Typography component="span" sx={{ wordWrap: 'break-word' }}>
        {children}
      </Typography>
    </Stack>
  );
};
