import * as React from 'react';
import { useEffect, useReducer, useState } from 'react';

import { ListItem } from '../list-view/list-item';
import { ListView } from '../list-view/list-view';
import { Chore } from './chore';
import { ChoreCompleteIndicator } from './chore-complete-indicator';
import { ChoreIncompleteIndicator } from './chore-incomplete-indicator';
import { ChoreProvider } from './chore-provider';

type ChoreAction = {
  type: string;
  chore: Chore;
  error?: any;
};
const TOGGLE_COMPLETED_TYPE = 'TOGGLE_COMPLETED';
const TOGGLE_COMPLETED_FAILURE_TYPE = 'TOGGLE_COMPLETED_FAILURE';
const toggleCompleted = (chore: Chore) => ({ type: TOGGLE_COMPLETED_TYPE, chore });
const toggleCompletedFailure = (chore: Chore, error: any) => ({ type: TOGGLE_COMPLETED_FAILURE_TYPE, chore, error });

// Local UI state, updated optimistically (concurrent with remote state)
const choresReducer = (state: Chore[], action: ChoreAction) => {
  switch (action.type) {
    case TOGGLE_COMPLETED_TYPE:
      return state.map(chore => {
        if (chore.id === action.chore.id) {
          return {
            ...chore,
            completed: !chore.completed,
            error: undefined,
          };
        }

        return chore;
      });
    case TOGGLE_COMPLETED_FAILURE_TYPE:
      return state.map(chore => {
        if (chore.id === action.chore.id) {
          return {
            ...chore,
            error: action.error,
          };
        }

        return chore;
      });
    default:
      throw new Error('[ChoreList] unknown action');
  }
}

// Remote state, updated concurrently with local state
// http://mkumaran.net/2019/bestWayToDoAsyncInReactJsUsingHooks/
const dispatchMiddleware = (dispatch: React.Dispatch<ChoreAction>, { choreProvider }: { choreProvider: ChoreProvider }) => {
  return (action: ChoreAction) => {
    switch (action.type) {
      case TOGGLE_COMPLETED_TYPE:
        choreProvider.toggleChoreCompleted(action.chore).catch(err => {
          console.error('[toggleChoreCompleted]', '[error]', err);
          dispatch(toggleCompletedFailure(action.chore, err));
        });
        break;
    }
    return dispatch(action);
  }
}

export const ChoreList = ({ choreProvider }: { choreProvider: ChoreProvider }) => {
  const [chores, dispatchChoreAction] = useReducer(choresReducer, choreProvider.getChores());
  const dispatch = dispatchMiddleware(dispatchChoreAction, { choreProvider });

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
