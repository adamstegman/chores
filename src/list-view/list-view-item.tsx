import * as React from 'react'

import { ListItem } from './list-item';

export const ListViewItem = ({ item }: { item: ListItem }) => (
  <li className={item.onActivate ? 'activateable' : ''} onClick={item.onActivate}>
    {item.leading}
    <p>{item.name}</p>
  </li>
);
