import * as React from 'react'

import { ListItem } from './list-item';

export const ListViewItem = ({ item }: { item: ListItem }) => (
  <li className={`${item.onActivate ? 'activateable' : ''} ${item.error ? 'error' : ''}`} onClick={item.onActivate}>
    {item.leading}
    <p>{item.name}</p>
  </li>
);
