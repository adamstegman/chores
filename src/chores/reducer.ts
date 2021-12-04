import * as React from 'react';
import { Dispatch } from 'react';

import { Chore } from './chore';
import { ChoreProvider } from './chore-provider';

export type Action = {
  type: string;
};
export type ChoreAction = {
  type: string;
  chore?: Chore;
  chores?: Chore[];
  error?: any;
};
const CREATE_CHORE_TYPE = 'CREATE_CHORE';
const CREATE_CHORE_FAILURE_TYPE = 'CREATE_CHORE_FAILURE';
const FETCH_CHORES_TYPE = 'FETCH_CHORES';
const FETCH_CHORES_FAILURE_TYPE = 'FETCH_CHORES_FAILURE';
const FETCH_CHORES_SUCCESS_TYPE = 'FETCH_CHORES_SUCCESS';
const TOGGLE_COMPLETED_TYPE = 'TOGGLE_COMPLETED';
const TOGGLE_COMPLETED_FAILURE_TYPE = 'TOGGLE_COMPLETED_FAILURE';
const UPDATE_CHORE_TYPE = 'UPDATE_CHORE';
const UPDATE_CHORE_FAILURE_TYPE = 'UPDATE_CHORE_FAILURE';
export const createChore = (chore: Chore): ChoreAction => ({ type: CREATE_CHORE_TYPE, chore});
export const createChoreFailure = (chore: Chore, error: any): ChoreAction => ({ type: CREATE_CHORE_FAILURE_TYPE, chore, error });
export const fetchChores = (): ChoreAction => ({ type: FETCH_CHORES_TYPE });
export const fetchChoresFailure = (error: any): ChoreAction => ({ type: FETCH_CHORES_FAILURE_TYPE, error});
export const fetchChoresSuccess = (chores: Chore[]): ChoreAction => ({ type: FETCH_CHORES_SUCCESS_TYPE, chores });
export const toggleCompleted = (chore: Chore): ChoreAction => ({ type: TOGGLE_COMPLETED_TYPE, chore });
export const toggleCompletedFailure = (chore: Chore, error: any): ChoreAction => ({ type: TOGGLE_COMPLETED_FAILURE_TYPE, chore, error });
export const updateChore = (chore: Chore): ChoreAction => ({ type: UPDATE_CHORE_TYPE, chore});
export const updateChoreFailure = (chore: Chore, error: any): ChoreAction => ({ type: UPDATE_CHORE_FAILURE_TYPE, chore, error });

// Local UI state, updated optimistically (concurrent with remote state)
export interface State {
  chores: Chore[];
}
export const initialState: State = {
  chores: [],
};
const choresReducer = (state: Chore[], action: ChoreAction) => {
  switch (action.type) {
    case CREATE_CHORE_TYPE:
      return state.map(chore => ({ ...chore })).concat([action.chore]);
    case FETCH_CHORES_SUCCESS_TYPE:
      return action.chores.map(chore => ({ ...chore }));
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
    case UPDATE_CHORE_TYPE:
      return state.map(chore => {
        if (chore.id === action.chore.id) {
          return action.chore;
        }

        return chore;
      });
    case FETCH_CHORES_FAILURE_TYPE:
      return [{ id: 'failure', name: 'Could not list chores', error: action.error, completed: false }]
    case CREATE_CHORE_FAILURE_TYPE:
    case TOGGLE_COMPLETED_FAILURE_TYPE:
    case UPDATE_CHORE_FAILURE_TYPE:
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
      return state;
  }
}
export const reducer = (state: State, action: Action) => {
  return {
    chores: choresReducer(state.chores, action as ChoreAction),
  };
}

// Remote state, updated concurrently with local state.
// Wraps dispatch to intercept actions that should be handled in remote state too.
// http://mkumaran.net/2019/bestWayToDoAsyncInReactJsUsingHooks/
export const dispatchMiddleware = (dispatch: Dispatch<ChoreAction>, { choreProvider }: { choreProvider: ChoreProvider }) => {
  return (action: ChoreAction) => {
    if (action.type === CREATE_CHORE_TYPE) {
      choreProvider.addChore(action.chore).catch(err => {
        console.error('[addChore]', '[error]', err);
        dispatch(createChoreFailure(action.chore, err));
      });
    } else if (action.type === FETCH_CHORES_TYPE) {
      choreProvider.getChores().then(chores => {
        dispatch(fetchChoresSuccess(chores));
      }, err => {
        console.error('[fetchChores]', '[error]', err);
        dispatch(fetchChoresFailure(err));
      });
    } else if (action.type === TOGGLE_COMPLETED_TYPE) {
      choreProvider.toggleChoreCompleted(action.chore).catch(err => {
        console.error('[toggleChoreCompleted]', '[error]', err);
        dispatch(toggleCompletedFailure(action.chore, err));
      });
    } else if (action.type === UPDATE_CHORE_TYPE) {
      choreProvider.updateChore(action.chore).catch(err => {
        console.error('[updateChore]', '[error]', err);
        dispatch(updateChoreFailure(action.chore, err));
      });
    }
    return dispatch(action);
  }
}
