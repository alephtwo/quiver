import * as React from 'react';
import { useState } from 'react';
import { ScheduleSend } from '@mui/icons-material';
import { Button } from '@mui/material';
import { Container } from '@mui/system';
import { NewReservationDialog } from './NewReservationDialog';

export function Application(): JSX.Element {
  const [open, setOpen] = React.useState(false);

  return (
    <Container sx={styles.container}>
      <Button variant="contained" startIcon={<ScheduleSend />} onClick={() => setOpen(true)}>
        Schedule
      </Button>
      <NewReservationDialog open={open} onClose={() => setOpen(false)} />
    </Container>
  );
}

const styles = {
  container: {
    my: 2,
  },
};
