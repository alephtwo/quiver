import * as React from 'react';
import { useReducer } from 'react';
import { Container, Stack } from '@mui/material';
import { Header } from './scaffold/Header';
import { Home } from './pages/Home';
import { Schedule } from './pages/Schedule';
import { NewReservation } from './pages/NewReservation';
import { Navigation } from './scaffold/Navigation';
import { Tab } from '../types/Tab';
import * as State from '../reducer/State';

export function Application(): JSX.Element {
  const [state, dispatch] = useReducer(State.reduce, State.initialState);
  const { tab } = state;

  return (
    <Stack spacing={2} alignItems="center">
      <Header />
      <Container>
        <Page tab={Tab.HOME} currentTab={tab}>
          <Home />
        </Page>
        <Page tab={Tab.SCHEDULE} currentTab={tab}>
          <Schedule />
        </Page>
        <Page tab={Tab.NEW_RESERVATION} currentTab={tab}>
          <NewReservation />
        </Page>
      </Container>
      <Navigation tab={tab} setTab={(t) => dispatch({ action: 'set-tab', tab: t })} />
    </Stack>
  );
}

interface PageProps {
  tab: Tab;
  currentTab: number;
  children: React.ReactNode;
}
function Page(props: PageProps): JSX.Element {
  if (props.tab != props.currentTab) {
    return <></>;
  }
  return <>{props.children}</>;
}
