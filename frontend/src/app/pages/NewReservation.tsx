import * as React from 'react';
import { useEffect } from 'react';
import {
  Autocomplete,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  FormGroup,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import SendIcon from '@mui/icons-material/Send';
import { DateTime } from 'luxon';
import { Lane } from '../../types/Lane';
import { Message } from '../../reducer/Message';
import { NewReservationState } from '../../reducer/State';
import { Tab } from '../../types/Tab';
import { fetchLanes } from '../../reducer/Rest';

const dateTimeInputFormat = 'yyyy-MM-dd HH:mm';

interface NewReservationProps {
  dispatch: React.Dispatch<Message>;
  state: NewReservationState;
  allLanes: Array<Lane>;
}
export function NewReservation(props: NewReservationProps): JSX.Element {
  const { dispatch, state } = props;
  const loading = state.selectingLanes && props.allLanes.length === 0;

  useEffect(() => {
    if (!loading) {
      return undefined;
    }

    void fetchLanes().then((r: Array<Lane>) => dispatch({ action: 'set-lanes', lanes: r }));
  }, [loading]);

  useEffect(() => {
    if (!open) {
      dispatch({ action: 'set-lanes', lanes: [] });
    }
  }, [open]);

  return (
    <Stack spacing={2}>
      <Typography variant="h4" align="center">
        New Reservation
      </Typography>
      <FormGroup>
        <FormControlLabel
          label="Rental"
          control={
            <Checkbox checked={state.rental} onChange={() => dispatch({ action: 'new-reservation-toggle-rental' })} />
          }
        />
      </FormGroup>
      <Stack direction="row" spacing={1} justifyContent="space-evenly">
        <DateTimePicker
          label="Starts At"
          value={state.startsAt.toJSDate()}
          inputFormat={dateTimeInputFormat}
          renderInput={(params) => <TextField {...params} fullWidth />}
          onChange={(value: DateTime | null) => {
            dispatch({ action: 'new-reservation-set-starts-at', value: value });
          }}
        />
        <DateTimePicker
          label="Ends At"
          value={state.endsAt.toJSDate()}
          inputFormat={dateTimeInputFormat}
          renderInput={(params) => <TextField {...params} fullWidth />}
          onChange={(value: DateTime | null) => {
            dispatch({ action: 'new-reservation-set-ends-at', value: value });
          }}
        />
      </Stack>
      <Autocomplete
        multiple
        filterSelectedOptions
        open={state.selectingLanes}
        loading={loading}
        onOpen={() => dispatch({ action: 'new-reservation-set-selecting-lanes', value: true })}
        onClose={() => dispatch({ action: 'new-reservation-set-selecting-lanes', value: false })}
        isOptionEqualToValue={(option, value) => option.id == value.id}
        getOptionLabel={(option: Lane) => option.number.toString()}
        options={props.allLanes}
        value={state.lanes}
        onChange={(_e, v) => dispatch({ action: 'new-reservation-set-lanes', value: v })}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Lanes"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
      <TextField
        multiline
        rows={2}
        label="Notes"
        value={state.notes}
        onChange={(e) => dispatch({ action: 'new-reservation-set-notes', value: e.target.value })}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        startIcon={<SendIcon />}
        onClick={() => {
          void createNewReservation({
            rental: state.rental,
            startsAt: state.startsAt,
            endsAt: state.endsAt,
            lanes: state.lanes,
            notes: state.notes,
          }).then((response) => {
            if (response.ok) {
              dispatch({ action: 'set-tab', tab: Tab.HOME });
            } else {
              console.error(response);
            }
          });
        }}
      >
        Submit
      </Button>
    </Stack>
  );
}

interface CreateNewReservationRequestPayload {
  rental: boolean;
  startsAt: DateTime;
  endsAt: DateTime;
  lanes: Array<Lane>;
  notes: string;
}
async function createNewReservation(payload: CreateNewReservationRequestPayload): Promise<Response> {
  const body = {
    rental: payload.rental,
    startsAt: payload.startsAt.toISO(),
    endsAt: payload.endsAt ? payload.endsAt.toISO() : payload.startsAt.toISO(),
    lanes: payload.lanes.map((lane) => lane.id),
    notes: payload.notes,
  };

  return fetch('/api/reservations', {
    method: 'post',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
