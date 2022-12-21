import * as React from 'react';
import { useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { createTheme, ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { Application } from './app/Application';
import useMediaQuery from '@mui/material/useMediaQuery';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';

const mount = document.getElementById('app') as HTMLDivElement;
const root = createRoot(mount);
root.render(<Root />);

function Root(): JSX.Element {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterLuxon}>
        <CssBaseline />
        <Application />
      </LocalizationProvider>
    </ThemeProvider>
  );
}
