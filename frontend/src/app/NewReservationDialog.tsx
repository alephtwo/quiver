import * as React from 'react';
import { Checkbox, Dialog, DialogContent, DialogTitle, FormControlLabel, FormGroup, TextField } from '@mui/material';

interface NewReservationDialogProps {
  open: boolean;
  onClose: () => void;
}
export function NewReservationDialog(props: NewReservationDialogProps) {
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>New Reservation</DialogTitle>
      <DialogContent>
        <FormGroup>
          <FormControlLabel control={<Checkbox defaultChecked />} label="Rental" />
        </FormGroup>
        <TextField multiline rows={2} label="Notes" />
      </DialogContent>
    </Dialog>
  );
}
