import * as React from 'react';
import { Dispatch } from 'react';

import { AddChore } from './add-chore';
import { ChoreAction } from './reducer';

export const ChoresHeader = ({ dispatch }: { dispatch: Dispatch<ChoreAction> }) => (
  <header>
    <h1>Chores</h1>
    <AddChore />
  </header>
);
