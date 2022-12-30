import { AlertColor } from '@mui/material';
import { DateTime } from 'luxon';
import { Lane } from '../types/Lane';
import { Reservation } from '../types/Reservation';
import { Tab } from '../types/Tab';

export type Message =
  | { action: 'set-tab'; tab: Tab }
  | { action: 'fetch-lanes'; then: (lanes: Array<Lane>) => void }
  | { action: 'set-lanes'; lanes: Array<Lane> }
  | { action: 'set-snackbar'; severity: AlertColor; text: string }
  | { action: 'close-snackbar' }
  | { action: 'new-reservation-toggle-rental' }
  | { action: 'new-reservation-set-starts-at'; value: DateTime | null }
  | { action: 'new-reservation-set-ends-at'; value: DateTime | null }
  | { action: 'new-reservation-set-selecting-lanes'; value: boolean }
  | { action: 'new-reservation-set-lanes'; value: Array<Lane> }
  | { action: 'new-reservation-set-notes'; value: string }
  | { action: 'save-new-reservation'; then: () => void }
  | { action: 'finish-save-new-reservation' }
  | { action: 'fetch-reservations'; then: (reservations: Array<Reservation>) => void }
  | { action: 'set-reservations'; reservations: Array<Reservation> }
  | { action: 'delete-reservation'; id: string; then: () => void }
  | { action: 'finish-delete-reservation'; id: string };
