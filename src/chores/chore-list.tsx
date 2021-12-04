import * as React from 'react';
import { Dispatch } from 'react';

import { ListView } from '../list-view/list-view';
import { Chore } from './chore';
import { ChoreCompleteToggle } from './chore-complete-toggle';
import { ChoreListItemBody } from './chore-list-item-body';
import { ChoreAction } from './reducer';

export const ChoreList = ({ chores, dispatch }: { chores: Chore[], dispatch: Dispatch<ChoreAction> }) => {
  const items = chores.map(chore => ({
    key: chore.id,
    body: <ChoreListItemBody chore={chore} />,
    leading: <ChoreCompleteToggle chore={chore} dispatch={dispatch} />,
    error: chore.error,
  }));
  return <ListView items={items} />
};
