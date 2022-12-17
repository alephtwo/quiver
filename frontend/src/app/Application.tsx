import * as React from 'react';
import { useState } from 'react';
import { Container, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { Lane } from '../types/Lane';

export function Application(): JSX.Element {
  return (
    <Container>
      <Typography variant="h1">Lanes</Typography>
      <Lanes />
    </Container>
  );
}

function Lanes() {
  const [lanes, setLanes] = useState<Array<Lane>>([]);
  const [loading, setLoading] = useState(true);
  React.useEffect(() => {
    void fetch('/api/lanes')
      .then((r) => r.json())
      .then((r: Array<Lane>) => {
        setLanes(r);
        setLoading(false);
      });
  });

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <Table component={Paper}>
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Number</TableCell>
          <TableCell>Created At</TableCell>
          <TableCell>Modified At</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {lanes.map((lane: Lane) => (
          <TableRow key={`lane-${lane.id}`}>
            <TableCell>{lane.id}</TableCell>
            <TableCell>{lane.number}</TableCell>
            <TableCell>{lane.createdAt}</TableCell>
            <TableCell>{lane.updatedAt}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
