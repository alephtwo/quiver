import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  Autocomplete,
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  TextField,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { Stack } from '@mui/system';
import SendIcon from '@mui/icons-material/Send';
import { Lane } from '../types/Lane';

interface NewReservationDialogProps {
  open: boolean;
  onClose: () => void;
}
export function NewReservationDialog(props: NewReservationDialogProps) {
  const [selectingLanes, setSelectingLanes] = useState(false);
  const [lanes, setLanes] = useState<readonly Lane[]>([]);
  const loading = selectingLanes && lanes.length === 0;

  useEffect(() => {
    if (!loading) {
      return undefined;
    }
    void fetch('/api/lanes')
      .then((r) => r.json())
      .then((r: Array<Lane>) => setLanes(r));
  }, [loading]);

  useEffect(() => {
    if (!open) {
      setLanes([]);
    }
  }, [open]);

  return (
    <Dialog open={props.open} onClose={props.onClose} fullWidth>
      <DialogTitle>New Reservation</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <FormGroup>
            <FormControlLabel control={<Checkbox defaultChecked />} label="Rental" />
          </FormGroup>
          <LocalizationProvider dateAdapter={AdapterLuxon}>
            <DateTimePicker
              label="Starts At"
              value={new Date()}
              onChange={() => {
                console.log('Implement');
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterLuxon}>
            <DateTimePicker
              label="Ends At"
              value={new Date()}
              onChange={() => {
                console.log('Implement');
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <Autocomplete
            multiple
            filterSelectedOptions
            open={selectingLanes}
            loading={loading}
            onOpen={() => setSelectingLanes(true)}
            onClose={() => setSelectingLanes(false)}
            isOptionEqualToValue={(option, value) => option.id == value.id}
            getOptionLabel={(option: Lane) => option.number.toString()}
            options={lanes}
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
          <TextField multiline rows={2} label="Notes" />
          <Button variant="contained" color="primary" fullWidth startIcon={<SendIcon />}>
            Submit
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
