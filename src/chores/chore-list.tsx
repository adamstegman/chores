import * as React from 'react';
import { Dispatch } from 'react';

import { ListView } from '../list-view/list-view';
import { Chore } from './chore';
import { ChoreCompleteIndicator } from './chore-complete-indicator';
import { ChoreIncompleteIndicator } from './chore-incomplete-indicator';
import { ChoreAction, toggleCompleted } from './reducer';

export const ChoreList = ({ chores, dispatch }: { chores: Chore[], dispatch: Dispatch<ChoreAction> }) => {
  const items = chores.map(chore => ({
    key: chore.id,
    name: chore.name,
    leading: chore.completed ? <ChoreCompleteIndicator /> : <ChoreIncompleteIndicator />,
    onActivate: () => {
      dispatch(toggleCompleted(chore));
    },
    error: chore.error,
  }));
  return <ListView items={items} />
};
