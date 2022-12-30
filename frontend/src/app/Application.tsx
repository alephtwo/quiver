import * as React from 'react';
import { useReducer } from 'react';
import { Alert, Container, Snackbar, Stack } from '@mui/material';
import { Header } from './scaffold/Header';
import { Home } from './pages/Home';
import { Schedule } from './pages/Schedule';
import { NewReservation } from './pages/NewReservation';
import { Navigation } from './scaffold/Navigation';
import { Tab } from '../types/Tab';
import { initialState } from '../reducer/State';
import { reduce } from '../reducer/Reducer';

export function Application(): JSX.Element {
  const [state, dispatch] = useReducer(reduce, initialState());
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
          <NewReservation dispatch={dispatch} allLanes={state.lanes} state={state.newReservation} />
        </Page>
      </Container>
      <Navigation tab={tab} setTab={(t) => dispatch({ action: 'set-tab', tab: t })} />
      <Snackbar
        open={state.snackbar.open}
        autoHideDuration={6000}
        onClose={() => dispatch({ action: 'close-snackbar' })}
      >
        <Alert
          onClose={() => dispatch({ action: 'close-snackbar' })}
          severity={state.snackbar.severity}
          variant="filled"
        >
          {state.snackbar.text}
        </Alert>
      </Snackbar>
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
