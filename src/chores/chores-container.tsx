import * as React from 'react';
import { useEffect, useReducer } from 'react';
import { Route, Routes } from 'react-router-dom';

import { ChoreProvider } from './chore-provider';
import { ChoresBody } from './chores-body';
import { ChoresHeader } from './chores-header';
import { EditChore } from './edit-chore';
import { NewChore } from './new-chore';
import { fetchChores, initialState, reducer, dispatchMiddleware } from './reducer';

const choreProvider = new ChoreProvider();
export const ChoresContainer = () => {
  const [state, dispatchLocalAction] = useReducer(reducer, initialState);
  const dispatchRemoteAction = dispatchMiddleware(dispatchLocalAction, { choreProvider });

  const { chores } = state;
  useEffect(() => {
    if (chores.length > 0) {
      return;
    }

    dispatchRemoteAction(fetchChores());
  });

  return (
    <>
      <ChoresHeader dispatch={dispatchRemoteAction} />
      <Routes>
        <Route index element={<ChoresBody chores={chores} dispatch={dispatchRemoteAction} />} />
        <Route path="new" element={<NewChore dispatch={dispatchRemoteAction} />} />
        <Route path=":choreId" element={<EditChore chores={chores} dispatch={dispatchRemoteAction} />} />
      </Routes>
    </>
  );
}
