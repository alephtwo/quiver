import produce from 'immer';
import { DateTime } from 'luxon';
import { Tab } from '../types/Tab';
import { Message } from './Message';
import { createNewReservation, fetchLanes } from './Rest';
import { initialNewReservationState, State } from './State';

export function reduce(state: State, message: Message): State {
  switch (message.action) {
    case 'set-tab':
      return produce(state, (next) => {
        next.tab = message.tab;
      });
    case 'fetch-lanes':
      void fetchLanes().then(message.then);
      return state;
    case 'set-lanes':
      return produce(state, (next) => {
        next.lanes = message.lanes;
      });
    case 'set-snackbar':
      return produce(state, (next) => {
        next.snackbar.open = true;
        next.snackbar.severity = message.severity;
        next.snackbar.text = message.text;
      });
    case 'close-snackbar':
      return produce(state, (next) => {
        next.snackbar = { open: false };
      });
    case 'new-reservation-toggle-rental':
      return produce(state, (next) => {
        next.newReservation.rental = !next.newReservation.rental;
      });
    case 'new-reservation-set-starts-at':
      return setStartsAt(state, message.value);
    case 'new-reservation-set-ends-at':
      return setEndsAt(state, message.value);
    case 'new-reservation-set-selecting-lanes':
      return produce(state, (next) => {
        next.newReservation.selectingLanes = message.value;
      });
    case 'new-reservation-set-lanes':
      return produce(state, (next) => {
        next.newReservation.lanes = message.value;
      });
    case 'new-reservation-set-notes':
      return produce(state, (next) => {
        next.newReservation.notes = message.value;
      });
    case 'save-new-reservation':
      void createNewReservation({
        rental: state.newReservation.rental,
        startsAt: state.newReservation.startsAt,
        endsAt: state.newReservation.endsAt,
        lanes: state.newReservation.lanes,
        notes: state.newReservation.notes,
      }).then(message.then);
      return state;
    case 'finish-save-new-reservation':
      return produce(state, (next) => {
        next.newReservation = initialNewReservationState();
        next.tab = Tab.HOME;
      });
    default:
      return state;
  }
}

function setStartsAt(state: State, value: DateTime | null): State {
  if (value === null) {
    console.error('Starts At cannot be null.');
    return state;
  }
  return produce(state, (next) => {
    next.newReservation.startsAt = value;
    next.newReservation.endsAt = value.plus({ hours: 1 });
  });
}

function setEndsAt(state: State, value: DateTime | null): State {
  if (value === null) {
    console.error('Ends At cannot be null.');
    return state;
  }
  return produce(state, (next) => {
    next.newReservation.endsAt = value;
  });
}
