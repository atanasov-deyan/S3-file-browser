import React from 'react';
import { Route, BrowserRouter, Routes as RouterRoutes } from 'react-router-dom';

import { LoginPage } from './components/pages/LoginPage';
import { HomePage } from './components/pages/HomePage';

export const Routes = () => (
  <BrowserRouter>
    <RouterRoutes>
      <Route
        path='/login'
        element={<LoginPage/>}
      />

      <Route
        path='/'
        element={<HomePage/>}
      />
    </RouterRoutes>
  </BrowserRouter>
);
