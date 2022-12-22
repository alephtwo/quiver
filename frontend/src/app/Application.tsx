import * as React from 'react';
import { useState } from 'react';
import { Container, Stack } from '@mui/material';
import { Header } from './scaffold/Header';
import { Home } from './pages/Home';
import { Schedule } from './pages/Schedule';
import { NewReservation } from './pages/NewReservation';
import { Navigation } from './scaffold/Navigation';

export function Application(): JSX.Element {
  const [tab, setTab] = useState(0);
  return (
    <Stack spacing={2} alignItems="center">
      <Header />
      <Container>
        <Page tab={0} currentTab={tab}>
          <Home />
        </Page>
        <Page tab={1} currentTab={tab}>
          <Schedule />
        </Page>
        <Page tab={2} currentTab={tab}>
          <NewReservation />
        </Page>
      </Container>
      <Navigation tab={tab} setTab={setTab} />
    </Stack>
  );
}

interface PageProps {
  tab: number;
  currentTab: number;
  children: React.ReactNode;
}
function Page(props: PageProps): JSX.Element {
  if (props.tab != props.currentTab) {
    return <></>;
  }
  return <>{props.children}</>;
}
