import * as React from 'react';
import { Dispatch } from 'react';

import { Chore } from './chore';
import { ChoreProvider } from './chore-provider';

export type ChoreAction = {
  type: string;
  chore: Chore;
  error?: any;
};
const CREATE_CHORE_TYPE = 'CREATE_CHORE';
const CREATE_CHORE_FAILURE_TYPE = 'CREATE_CHORE_FAILURE';
const TOGGLE_COMPLETED_TYPE = 'TOGGLE_COMPLETED';
const TOGGLE_COMPLETED_FAILURE_TYPE = 'TOGGLE_COMPLETED_FAILURE';
export const createChore = (chore: Chore) => ({ type: CREATE_CHORE_TYPE, chore});
export const createChoreFailure = (chore: Chore, error: any) => ({ type: CREATE_CHORE_FAILURE_TYPE, chore, error });
export const toggleCompleted = (chore: Chore) => ({ type: TOGGLE_COMPLETED_TYPE, chore });
export const toggleCompletedFailure = (chore: Chore, error: any) => ({ type: TOGGLE_COMPLETED_FAILURE_TYPE, chore, error });

// Local UI state, updated optimistically (concurrent with remote state)
export const choresReducer = (state: Chore[], action: ChoreAction) => {
  switch (action.type) {
    case CREATE_CHORE_TYPE:
      return state.map(chore => ({ ...chore })).concat([action.chore]);
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
    case CREATE_CHORE_FAILURE_TYPE:
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
export const dispatchMiddleware = (dispatch: Dispatch<ChoreAction>, { choreProvider }: { choreProvider: ChoreProvider }) => {
  return (action: ChoreAction) => {
    switch (action.type) {
      case CREATE_CHORE_TYPE:
        choreProvider.addChore(action.chore).catch(err => {
          console.error('[addChore]', '[error]', err);
          dispatch(createChoreFailure(action.chore, err));
        });
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
