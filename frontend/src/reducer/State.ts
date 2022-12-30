import { DateTime } from 'luxon';
import { Lane } from '../types/Lane';
import { Tab } from '../types/Tab';

export interface State {
  tab: Tab;
  lanes: Array<Lane>;
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

export const initialState: State = {
  tab: Tab.HOME,
  lanes: [],
  newReservation: {
    rental: false,
    startsAt: DateTime.now(),
    endsAt: DateTime.now().plus({ hours: 1 }),
    lanes: [],
    notes: '',
    selectingLanes: false,
  },
};
