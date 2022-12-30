import { DateTime } from 'luxon';
import { Lane } from '../types/Lane';
import { Tab } from '../types/Tab';

export type Message =
  | { action: 'set-tab'; tab: Tab }
  | { action: 'set-lanes'; lanes: Array<Lane> }
  | { action: 'new-reservation-toggle-rental' }
  | { action: 'new-reservation-set-starts-at'; value: DateTime | null }
  | { action: 'new-reservation-set-ends-at'; value: DateTime | null }
  | { action: 'new-reservation-set-selecting-lanes'; value: boolean }
  | { action: 'new-reservation-set-lanes'; value: Array<Lane> }
  | { action: 'new-reservation-set-notes'; value: string };
