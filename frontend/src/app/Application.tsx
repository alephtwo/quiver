import * as React from 'react';
import ScheduleSend from '@mui/icons-material/ScheduleSend';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
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
