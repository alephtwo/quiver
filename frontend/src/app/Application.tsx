import * as React from 'react';
import { useState } from 'react';
import Container from '@mui/material/Container';
import { Navigation } from './Navigation';

export function Application(): JSX.Element {
  const [tab, setTab] = useState(0);

  return (
    <>
      <Container sx={styles.container}></Container>

      <Navigation tab={tab} setTab={setTab} />
    </>
  );
}

const styles = {
  container: {
    marginTop: 1,
  },
};
