import * as React from 'react'

import { ListView} from '../list-view/list-view';
import { ChoreProvider } from './chore-provider';

export const ChoreList = ({ choreProvider }: { choreProvider: ChoreProvider }) => (
  <ListView items={choreProvider.getChores()} />
);
