import * as React from 'react';
import { useState } from 'react';
import Container from '@mui/material/Container';
import { Navigation } from './Navigation';
import { Typography } from '@mui/material';
import { Header } from './Header';

export function Application(): JSX.Element {
  const [tab, setTab] = useState(0);

  return (
    <>
      <Header />
      <Navigation tab={tab} setTab={setTab} />
    </>
  );
}

const styles = {
  container: {
    marginTop: 1,
  },
};
