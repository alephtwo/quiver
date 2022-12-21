import * as React from 'react';
import { useState } from 'react';
import { Stack, Typography } from '@mui/material';
import { Navigation } from './Navigation';
import { Header } from './Header';

export function Application(): JSX.Element {
  const [tab, setTab] = useState(0);
  return (
    <Stack spacing={2}>
      <Header />
      <Page tab={0} currentTab={tab}>
        <Typography variant="h1">Home</Typography>
      </Page>
      <Page tab={1} currentTab={tab}>
        <Typography variant="h1">Schedule</Typography>
      </Page>
      <Page tab={2} currentTab={tab}>
        <Typography variant="h1">New Reservation</Typography>
      </Page>
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
