import React from 'react';
import { Route, BrowserRouter, Routes as RouterRoutes } from 'react-router-dom';

import { LoginPage } from './LoginPage';
import { HomePage } from './HomePage';
import { GuardUnauthorized } from './GuardUnauthorized';

export const Routes = () => (
  <BrowserRouter>
    <RouterRoutes>
      <Route
        path='/login'
        element={<LoginPage/>}
      />

      <Route
        path='/'
        element={
        <GuardUnauthorized>
          <HomePage/>
        </GuardUnauthorized>
      }
      />
    </RouterRoutes>
  </BrowserRouter>
);
