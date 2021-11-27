import * as React from 'react';
import { useReducer } from 'react';

import { ChoreProvider } from './chore-provider';
import { ChoresBody } from './chores-body';
import { ChoresHeader } from './chores-header';
import { choresReducer, dispatchMiddleware } from './reducer';

const choreProvider = new ChoreProvider();
export const ChoresContainer = () => {
  const [chores, dispatchLocalChoreAction] = useReducer(choresReducer, choreProvider.getChores());
  const dispatchRemoteChoreAction = dispatchMiddleware(dispatchLocalChoreAction, { choreProvider });

  return (
    <>
      <ChoresHeader dispatch={dispatchRemoteChoreAction} />
      <ChoresBody chores={chores} dispatch={dispatchRemoteChoreAction} />
    </>
  );
}
