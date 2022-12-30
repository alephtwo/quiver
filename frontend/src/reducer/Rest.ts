import { DateTime } from 'luxon';
import { Lane } from '../types/Lane';

export async function fetchLanes(): Promise<Array<Lane>> {
  return fetch('/api/lanes').then((r) => r.json() as Promise<Array<Lane>>);
}

interface CreateNewReservationRequestPayload {
  rental: boolean;
  startsAt: DateTime;
  endsAt: DateTime;
  lanes: Array<Lane>;
  notes: string;
}
export async function createNewReservation(payload: CreateNewReservationRequestPayload): Promise<Response> {
  const body = {
    rental: payload.rental,
    startsAt: payload.startsAt.toISO(),
    endsAt: payload.endsAt ? payload.endsAt.toISO() : payload.startsAt.toISO(),
    lanes: payload.lanes.map((lane) => lane.id),
    notes: payload.notes,
  };

  return fetch('/api/reservations', {
    method: 'post',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
