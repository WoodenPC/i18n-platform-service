import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppLayout } from './layout';

import { SignInPage  } from '@pages/sign-in';
import { SignUpPage } from '@pages/sign-up';

export function AppRouter() {
  return (
    <BrowserRouter>
    <AppLayout>
      <Routes>
        <Route path="/signIn" element={<SignInPage />} />
        <Route path="/signUp" element={<SignUpPage />} />
        <Route path="/team/:teamId">
          <Route path="projects" />
          <Route path="project/:projectId" />
        </Route>
      </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}
