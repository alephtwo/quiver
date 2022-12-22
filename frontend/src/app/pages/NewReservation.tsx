import * as React from 'react';
import { useState, useEffect } from 'react';
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

const dateTimeInputFormat = 'yyyy-MM-dd HH:mm';

export function NewReservation(): JSX.Element {
  const [rental, setRental] = useState(false);
  const [startsAt, setStartsAt] = useState<Date>(DateTime.now().toJSDate());
  const [endsAt, setEndsAt] = useState<Date>(DateTime.now().plus({ hours: 1 }).toJSDate());
  const [lanes, setLanes] = useState<Array<Lane>>([]);
  const [notes, setNotes] = useState('');

  const [allLanes, setAllLanes] = useState<readonly Lane[]>([]);
  const [selectingLanes, setSelectingLanes] = useState(false);
  const loading = selectingLanes && allLanes.length === 0;

  useEffect(() => {
    if (!loading) {
      return undefined;
    }
    void fetchLanes().then((r: Array<Lane>) => setAllLanes(r));
  }, [loading]);

  useEffect(() => {
    if (!open) {
      setAllLanes([]);
    }
  }, [open]);

  return (
    <Stack spacing={2}>
      <Typography variant="h4" align="center">
        New Reservation
      </Typography>
      <FormGroup>
        <FormControlLabel label="Rental" control={<Checkbox checked={rental} onChange={() => setRental(!rental)} />} />
      </FormGroup>
      <Stack direction="row" spacing={1} justifyContent="space-evenly">
        <DateTimePicker
          label="Starts At"
          value={startsAt}
          onChange={(value: DateTime | null) => {
            if (!value) {
              console.error('startsAt cannot be null');
              return;
            }
            setStartsAt(value.toJSDate());
            setEndsAt(value.plus({ hours: 1 }).toJSDate());
          }}
          inputFormat={dateTimeInputFormat}
          renderInput={(params) => <TextField {...params} fullWidth />}
        />
        <DateTimePicker
          label="Ends At"
          value={endsAt}
          onChange={(value: DateTime | null) => {
            if (!value) {
              console.error('endsAt cannot be null');
              return;
            }
            setEndsAt(value.toJSDate());
          }}
          inputFormat={dateTimeInputFormat}
          renderInput={(params) => <TextField {...params} fullWidth />}
        />
      </Stack>
      <Autocomplete
        multiple
        filterSelectedOptions
        open={selectingLanes}
        loading={loading}
        onOpen={() => setSelectingLanes(true)}
        onClose={() => setSelectingLanes(false)}
        isOptionEqualToValue={(option, value) => option.id == value.id}
        getOptionLabel={(option: Lane) => option.number.toString()}
        options={allLanes}
        value={lanes}
        onChange={(_e, v) => setLanes(v)}
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
      <TextField multiline rows={2} label="Notes" value={notes} onChange={(e) => setNotes(e.target.value)} />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        startIcon={<SendIcon />}
        onClick={() => {
          createNewReservation({
            rental: rental,
            startsAt: startsAt,
            endsAt: endsAt,
            lanes: lanes,
            notes: notes,
          }).then((response) => {
            if (response.ok) {
              // reset
              setRental(false);
              setStartsAt(DateTime.now().toJSDate());
              setEndsAt(DateTime.now().plus({ hours: 1 }).toJSDate());
              setLanes([]);
              setNotes('');
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

async function fetchLanes(): Promise<Array<Lane>> {
  return fetch('/api/lanes').then((r) => r.json());
}

interface CreateNewReservationRequestPayload {
  rental: boolean;
  startsAt: Date;
  endsAt: Date;
  lanes: Array<Lane>;
  notes: string;
}
async function createNewReservation(payload: CreateNewReservationRequestPayload): Promise<Response> {
  const body = {
    rental: payload.rental,
    startsAt: payload.startsAt.toISOString(),
    endsAt: payload.endsAt ? payload.endsAt.toISOString() : payload.startsAt.toISOString(),
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
