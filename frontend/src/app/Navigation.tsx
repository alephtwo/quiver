import * as React from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ScheduleSendIcon from '@mui/icons-material/ScheduleSend';

interface NavigationProps {
  tab: number;
  setTab: React.Dispatch<React.SetStateAction<number>>;
}
export function Navigation(props: NavigationProps): JSX.Element {
  const { tab, setTab } = props;
  return (
    <BottomNavigation showLabels value={tab} onChange={(_event, value) => setTab(value)}>
      <BottomNavigationAction label="Home" icon={<HomeIcon />} />
      <BottomNavigationAction label="Schedule" icon={<CalendarMonthIcon />} />
      <BottomNavigationAction label="New Reservation" icon={<ScheduleSendIcon />} />
    </BottomNavigation>
  );
}
