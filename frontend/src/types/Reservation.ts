import { Lane } from './Lane';

export interface Reservation {
  id: string;
  startsAt: string;
  endsAt: string;
  rental: boolean;
  lanes: Array<Lane>;
  notes: string;
  createdAt: string;
  updatedAt: string;
}
