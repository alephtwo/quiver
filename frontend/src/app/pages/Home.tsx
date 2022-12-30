import * as React from 'react';
import { Card, CardContent, CardHeader, IconButton, Skeleton, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { useEffect } from 'react';
import { Message } from '../../reducer/Message';
import { Reservation } from '../../types/Reservation';
import { DateTime } from 'luxon';
import { Lane } from '../../types/Lane';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

interface HomeProps {
  dispatch: React.Dispatch<Message>;
  reservations: Array<Reservation> | undefined;
}
export function Home(props: HomeProps): JSX.Element {
  const { dispatch, reservations } = props;

  useEffect(() => {
    if (reservations !== undefined) {
      return; // don't load if it's already loaded
    }
    dispatch({
      action: 'fetch-reservations',
      then: (r) => {
        dispatch({ action: 'set-reservations', reservations: r });
      },
    });
  });

  if (reservations === undefined) {
    // TODO: Be more sophisticated about displaying loading
    return <Skeleton variant="rectangular" width={40} height={40} />;
  }

  return (
    <Stack spacing={2}>
      <Typography variant="h4" align="center">
        Reservations
      </Typography>
      {reservations.map((r) => {
        // Sort the reservations... maybe even use a table for it
        const startsAt = DateTime.fromISO(r.startsAt).toLocaleString(DateTime.DATETIME_SHORT);
        const endsAt = DateTime.fromISO(r.endsAt).toLocaleString(DateTime.DATETIME_SHORT);
        const subheader = `${startsAt} - ${endsAt}`;
        return (
          <Card key={r.id}>
            <CardHeader
              title={buildTitle(r.lanes)}
              subheader={subheader}
              action={
                <IconButton
                  color="error"
                  onClick={() =>
                    dispatch({
                      action: 'delete-reservation',
                      id: r.id,
                      then: () => dispatch({ action: 'finish-delete-reservation', id: r.id }),
                    })
                  }
                >
                  <DeleteForeverIcon />
                </IconButton>
              }
            />
            {r.notes === '' ? <></> : <CardContent>{r.notes}</CardContent>}
          </Card>
        );
      })}
    </Stack>
  );
}

function buildTitle(lanes: Array<Lane>): string {
  if (lanes.length === 0) {
    return 'No Lanes';
  }

  if (lanes.length === 1) {
    return `Lane ${lanes[0].number}`;
  }

  const l = lanes.map((l) => l.number).sort((a, b) => a - b);
  return `Lanes ${l.join(', ')}`;
}
