import * as React from 'react'
import { Dispatch } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Chore } from './chore';
import { ChoreForm } from './chore-form';
import { ChoreAction, updateChore} from './reducer';

export const EditChore = ({ chores, dispatch }: { chores: Chore[], dispatch: Dispatch<ChoreAction> }) => {
  const { choreId } = useParams();
  const chore = chores.find(chore => chore.id === choreId);
  // FIXME: error state if chore is not found

  const navigate = useNavigate();
  const onSave = (updatedChore: Chore): void => {
    dispatch(updateChore(updatedChore));
    navigate('/chores');
  };

  return (
    <main>
      <ChoreForm chore={chore} onSave={onSave} />
    </main>
  )
};
