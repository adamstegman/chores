import * as React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { ChoresContainer } from '../chores/chores-container';
import { Footer } from './footer';

export const App = () => {
  return (
    <>
      <Routes>
        <Route path="chores/*" element={<ChoresContainer />} />
        <Route path="/" element={<Navigate to="/chores" />} />
      </Routes>
      <Footer />
    </>
  );
};
