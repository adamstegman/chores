import * as React from 'react'
import { ChangeEvent, FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';

import { Chore } from './chore';

type ChoreHandler = (chore: Chore) => void;

export const ChoreForm = ({ chore, onSave }: { chore: Chore, onSave: ChoreHandler }) => {
  const [name, setName] = useState(chore.name);
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === 'name') {
      setName(event.target.value);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    onSave({ ...chore, name });
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
