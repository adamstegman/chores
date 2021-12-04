import { ReactNode } from 'react';

export type ListItem = {
  key: string;
  body: ReactNode;
  leading?: ReactNode;
  error?: any;
}
