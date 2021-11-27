import * as React from 'react'

import { Chore } from '../chores/chore';
import { ChoreList } from '../chores/chore-list';
import { ChoreProvider } from '../chores/chore-provider';

export const Body = ({ chores }: { chores: Chore[] }) => (
  <main>
    <ChoreList choreProvider={choreProvider} />
  </main>
);
