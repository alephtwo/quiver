import produce from 'immer';
import { DateTime } from 'luxon';
import { Message } from './Message';
import { State } from './State';

export function reduce(state: State, message: Message) {
  switch (message.action) {
    case 'set-tab':
      return produce(state, (next) => {
        next.tab = message.tab;
      });
    case 'set-lanes':
      return produce(state, (next) => {
        next.lanes = message.lanes;
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
