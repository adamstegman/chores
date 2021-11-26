import * as React from 'react'

import { ChoreList } from '../chores/chore-list';
import { ChoreProvider } from '../chores/chore-provider';

export const Body = ({ choreProvider }: { choreProvider: ChoreProvider }) => (
  <main>
    <ChoreList choreProvider={choreProvider} />
  </main>
);
