import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { Application } from './app/Application';

const mount = document.getElementById('app') as HTMLDivElement;
const root = createRoot(mount);

// Render it all
const theme = createTheme({
  palette: {
    background: {
      default: '#336699',
    },
  },
});
const app = (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Application />
  </ThemeProvider>
);
root.render(app);
