import * as React from 'react'
import { Dispatch } from 'react';

import { Chore } from './chore';
import { ChoreList } from './chore-list';
import { ChoreAction } from './reducer';

export const ChoresBody = ({ chores, dispatch }: { chores: Chore[], dispatch: Dispatch<ChoreAction> }) => (
  <main>
    <ChoreList chores={chores} dispatch={dispatch} />
  </main>
);
