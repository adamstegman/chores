import * as React from 'react'

import { ChoreProvider } from '../chores/chore-provider';
import { Body} from './body';
import { Footer} from './footer';
import { Header } from './header';

const choreProvider = new ChoreProvider();
export const App = () => (
  <>
    <Header />
    <Body choreProvider={choreProvider} />
    <Footer />
  </>
);
