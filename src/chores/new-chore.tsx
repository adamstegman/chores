import * as React from 'react'
import { ChangeEvent, Dispatch, FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { ChoreAction, createChore } from './reducer';

export const NewChore = ({ dispatch }: { dispatch: Dispatch<ChoreAction> }) => {
  const [name, setName] = useState('');
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === 'name') {
      setName(event.target.value);
    }
  };

  const navigate = useNavigate();
  const newChore = { name, id: name, completed: false };
  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    dispatch(createChore(newChore));
    navigate('/chores');
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" placeholder="New chore" autoFocus required value={name} onChange={handleChange} />
        </div>
        <div>
          <input type="submit" value="Save" />
          <Link to="/chores">Cancel</Link>
        </div>
      </form>
    </main>
  )
};
