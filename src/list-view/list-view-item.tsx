import * as React from 'react'

import { ListItem } from './list-item';

export const ListViewItem = ({ item }: { item: ListItem }) => (
  <li>
    <p>{item.name}</p>
  </li>
);
