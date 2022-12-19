import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { createTheme, ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { Application } from './app/Application';

const mount = document.getElementById('app') as HTMLDivElement;
const root = createRoot(mount);

// Render it all
const theme = createTheme({});
const app = (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Application />
  </ThemeProvider>
);
root.render(app);
