import * as React from 'react';
import { useReducer } from 'react';
import { Route, Routes } from 'react-router-dom';

import { ChoreProvider } from './chore-provider';
import { ChoresBody } from './chores-body';
import { ChoresHeader } from './chores-header';
import { NewChore } from './new-chore';
import { choresReducer, dispatchMiddleware } from './reducer';

const choreProvider = new ChoreProvider();
export const ChoresContainer = () => {
  const [chores, dispatchLocalChoreAction] = useReducer(choresReducer, choreProvider.getChores());
  const dispatchRemoteChoreAction = dispatchMiddleware(dispatchLocalChoreAction, { choreProvider });

  return (
    <>
      <ChoresHeader dispatch={dispatchRemoteChoreAction} />
      <Routes>
        <Route index element={<ChoresBody chores={chores} dispatch={dispatchRemoteChoreAction} />} />
        <Route path="new" element={<NewChore dispatch={dispatchRemoteChoreAction} />} />
      </Routes>
    </>
  );
}
