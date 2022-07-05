import React from 'react';
import { BrowserRouter, Routes } from 'react-router-dom';

import { APP_ROUTES, renderRoutes } from './routes';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>{renderRoutes(APP_ROUTES)}</Routes>
    </BrowserRouter>
  );
}
