import * as React from 'react';

type EventHandler = () => void;

export type ListItem = {
  key: string;
  name: string;
  leading?: React.ReactNode;
  onActivate?: EventHandler;
  error?: any;
}
