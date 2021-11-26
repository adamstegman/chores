import * as React from 'react';

type EventHandler = () => void;

export class ListItem {
  key: string;
  name: string;
  leading: React.ReactNode;
  onActivate: EventHandler;

  constructor({ key, name, leading, onActivate}: { key: string, name: string, leading?: React.ReactNode, onActivate?: EventHandler }) {
    this.key = key;
    this.name = name;
    this.leading = leading;
    this.onActivate= onActivate;
  }
}
