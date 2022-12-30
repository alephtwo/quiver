import produce from 'immer';
import { Tab } from '../types/Tab';
import { Message } from './Message';

interface State {
  tab: Tab;
}

export function reduce(state: State, message: Message) {
  switch (message.action) {
    case 'set-tab':
      return produce(state, (next) => {
        next.tab = message.tab;
      });
    default:
      return state;
  }
}

export const initialState: State = {
  tab: Tab.HOME,
};
