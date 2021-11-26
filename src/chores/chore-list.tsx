import * as React from 'react';
import { useState } from 'react';

import { ListItem } from '../list-view/list-item';
import { ListView } from '../list-view/list-view';
import { ChoreCompleteIndicator } from './chore-complete-indicator';
import { ChoreIncompleteIndicator } from './chore-incomplete-indicator';
import { ChoreProvider } from './chore-provider';

export const ChoreList = ({ choreProvider }: { choreProvider: ChoreProvider }) => {
  const [chores, setChores] = useState(choreProvider.getChores());

  const items = chores.map((chore, i) => new ListItem({
    key: chore.id,
    name: chore.name,
    leading: chore.completed ? <ChoreCompleteIndicator /> : <ChoreIncompleteIndicator />,
    onActivate: () => {
      console.log('IN', i);
      choreProvider.toggleChoreCompleted(i);
      // TODO: this feels too heavy - we only need to re-render the single child that changed
      setChores(choreProvider.getChores());
    },
  }));
  return <ListView items={items} />
};
