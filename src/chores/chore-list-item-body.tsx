import * as React from 'react';
import { Link } from 'react-router-dom';

import { Chore } from './chore';

export const ChoreListItemBody = ({ chore }: { chore: Chore }) => {
  return (
    <Link className="list-item-body" to={`/chores/${chore.id}`}>
      <span>{chore.name}</span>
      <span>&#x25BA;</span>
    </Link>
  );
}
