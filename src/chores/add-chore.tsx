import * as React from 'react'
import { Dispatch } from 'react';

import { ChoreAction, createChore } from './reducer';

export const AddChore = ({ dispatch }: { dispatch: Dispatch<ChoreAction> }) => {
  const num = Math.floor(Math.random() * 1000);
  const name = `New chore ${num}`;
  const chore = { name, id: name, completed: false };
  return (
    <button onClick={() => dispatch(createChore(chore))}>
      +
    </button>
  );
};
