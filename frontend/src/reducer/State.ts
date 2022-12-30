import { AlertColor } from '@mui/material';
import { DateTime } from 'luxon';
import { Lane } from '../types/Lane';
import { Reservation } from '../types/Reservation';
import { Tab } from '../types/Tab';

export interface State {
  tab: Tab;
  lanes: Array<Lane>;
  reservations?: Array<Reservation>;
  snackbar: {
    open: boolean;
    severity?: AlertColor;
    text?: string;
  };
  newReservation: NewReservationState;
}

export interface NewReservationState {
  rental: boolean;
  startsAt: DateTime;
  endsAt: DateTime;
  lanes: Array<Lane>;
  notes: string;
  selectingLanes: boolean;
}

export const initialState = (): State => ({
  tab: Tab.HOME,
  lanes: [],
  snackbar: { open: false },
  newReservation: initialNewReservationState(),
});

// This needs to be lazy to ensure that the times are correct
export const initialNewReservationState = (): NewReservationState => ({
  rental: false,
  startsAt: DateTime.now(),
  endsAt: DateTime.now().plus({ hours: 1 }),
  lanes: [],
  notes: '',
  selectingLanes: false,
});
