import { Lane } from '../types/Lane';

export async function fetchLanes(): Promise<Array<Lane>> {
  return fetch('/api/lanes').then((r) => r.json() as Promise<Array<Lane>>);
}
