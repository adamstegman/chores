import * as React from 'react'

export const ChoreCompletedIndicator = ({ completed }: { completed: boolean }) => (
  <p className="leading">{completed ? 'C' : 'I' }</p>
);
