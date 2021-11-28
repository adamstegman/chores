import * as React from 'react';
import { useEffect, useReducer } from 'react';
import { Route, Routes } from 'react-router-dom';

import { ChoreProvider } from './chore-provider';
import { ChoresBody } from './chores-body';
import { ChoresHeader } from './chores-header';
import { NewChore } from './new-chore';
import { fetchChoresFailure, fetchChoresSuccess, initialState, reducer, dispatchMiddleware } from './reducer';

const choreProvider = new ChoreProvider();
export const ChoresContainer = () => {
  const [state, dispatchLocalAction] = useReducer(reducer, initialState);
  const { chores } = state;
  useEffect(() => {
    if (chores.length === 0) {
      choreProvider.getChores().then(chores => {
        dispatchLocalAction(fetchChoresSuccess(chores));
      }, error => {
        dispatchLocalAction(fetchChoresFailure(error));
      });
    }
  });
  const dispatchRemoteAction = dispatchMiddleware(dispatchLocalAction, { choreProvider });

  return (
    <>
      <ChoresHeader dispatch={dispatchRemoteAction} />
      <Routes>
        <Route index element={<ChoresBody chores={chores} dispatch={dispatchRemoteAction} />} />
        <Route path="new" element={<NewChore dispatch={dispatchRemoteAction} />} />
      </Routes>
    </>
  );
}
