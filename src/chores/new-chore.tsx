import * as React from 'react'
import { Dispatch } from 'react';
import { useNavigate } from 'react-router-dom';

import { emptyChore, Chore } from './chore';
import { ChoreForm } from './chore-form';
import { ChoreAction, createChore } from './reducer';

export const NewChore = ({ dispatch }: { dispatch: Dispatch<ChoreAction> }) => {
  const navigate = useNavigate();
  const newChore = { ...emptyChore };
  const onSave = (chore: Chore): void => {
    dispatch(createChore({ ...chore, id: chore.name }));
    navigate('/chores');
  };

  return (
    <main>
      <ChoreForm chore={newChore} onSave={onSave} />
    </main>
  )
};
