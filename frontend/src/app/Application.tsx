import * as React from 'react';
import { useState } from 'react';
import ScheduleSend from '@mui/icons-material/ScheduleSend';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { NewReservationDialog } from './NewReservationDialog';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ScheduleSendIcon from '@mui/icons-material/ScheduleSend';

export function Application(): JSX.Element {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState(0);

  return (
    <>
      <Container sx={styles.container}>
        <Button variant="contained" startIcon={<ScheduleSend />} onClick={() => setOpen(true)}>
          Schedule
        </Button>
        <NewReservationDialog open={open} onClose={() => setOpen(false)} />
      </Container>
      <BottomNavigation showLabels value={tab} onChange={(_event, value) => setTab(value)}>
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="Schedule" icon={<CalendarMonthIcon />} />
        <BottomNavigationAction label="New Reservation" icon={<ScheduleSendIcon />} />
      </BottomNavigation>
    </>
  );
}

const styles = {
  container: {
    my: 2,
  },
};
