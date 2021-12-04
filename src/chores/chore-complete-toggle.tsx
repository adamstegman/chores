import * as React from 'react'
import { Dispatch } from 'react';

import { Chore } from './chore';
import { ChoreAction, toggleCompleted} from './reducer';

export const ChoreCompleteToggle = ({ chore, dispatch }: { chore: Chore, dispatch: Dispatch<ChoreAction> }) => {
  const handleClick = () => {
    dispatch(toggleCompleted(chore));
  }
  return (
    <button type="button" className="leading" onClick={handleClick}>
      {
        chore.completed ?
          <img src="/checkmark-filled.svg" alt="Complete" width="36" /> :
          <img src="/checkmark-blank.svg" alt="Not complete" width="36" />
      }
    </button>
  );
};
