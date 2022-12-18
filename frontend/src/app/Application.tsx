import { ScheduleSend } from '@mui/icons-material';
import { Button } from '@mui/material';
import { Container } from '@mui/system';
import * as React from 'react';

export function Application(): JSX.Element {
  return (
    <Container sx={styles.container}>
      <Button variant="contained" startIcon={<ScheduleSend />}>
        Schedule
      </Button>
    </Container>
  );
}

const styles = {
  container: {
    my: 2,
  },
};
