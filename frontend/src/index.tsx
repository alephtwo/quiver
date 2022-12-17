import * as React from 'react';
import { createRoot } from 'react-dom/client';

const mount = document.getElementById('app') as HTMLDivElement;
const root = createRoot(mount);

const app = <h1>Hello, World!</h1>;
root.render(app);
