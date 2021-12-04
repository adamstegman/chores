import * as React from 'react'

import { ListItem } from './list-item';

export const ListViewItem = ({ item }: { item: ListItem }) => (
  <li className={`${item.error ? 'error' : ''}`}>
    {item.leading}
    {item.body}
  </li>
);
