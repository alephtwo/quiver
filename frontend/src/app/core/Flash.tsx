import * as React from 'react';
import { Alert, Fade, Snackbar } from '@mui/material';
import { AlertColor } from '@mui/material/Alert';

export interface FlashMessage {
  message: string;
  severity: AlertColor;
}
export interface FlashProps {
  message?: FlashMessage;
  onClose: () => void;
}
export function Flash(props: FlashProps): JSX.Element {
  return (
    <Snackbar
      open={props.message !== undefined}
      autoHideDuration={6000}
      onClose={() => props.onClose()}
      TransitionComponent={Fade}
    >
      <Alert severity={props.message?.severity} variant="filled">
        {props.message?.message}
      </Alert>
    </Snackbar>
  );
}
