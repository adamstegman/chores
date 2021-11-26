import * as React from 'react'

import { ListItem } from './list-item';
import { ListViewItem } from './list-view-item';

// TODO: Observable<ListItem> and take until screen is full
export const ListView = ({ items }: { items: ListItem[] }) => (
  <ol>
    {items.map(item => <ListViewItem item={item} />)}
  </ol>
);
