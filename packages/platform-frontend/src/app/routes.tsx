import { Route } from 'react-router-dom';
import React from 'react';
import { SignInPage } from '@pages/sign-in/sign-in';
import { SignUpPage } from '@pages/sign-up/sign-up';
import { ProjectPage } from '@pages/project/project';
import { ProjectsPage } from '@pages/projects/projects';
import { TeamPage } from '@pages/team/team';
import { ProfilePage } from '@pages/profile/profile';
import { MainPage } from '@pages/main/main';

import { GuestOnlyGuard } from './guards/guest-only';
import { AuthOnlyGuard } from './guards/auth-only';
import { AppLayout } from './app-layout';
import { GuestLayout } from './guest-layout';

type AppRouteObject = {
  path?: string;
  key?: string;
  element?: React.ReactNode;
  guestOnly?: boolean;
  authOnly?: boolean;
  subRoutes?: AppRouteObject[];
};

export const renderElement = (route: AppRouteObject) => {
  if (route.authOnly) {
    return <AuthOnlyGuard>{route.element}</AuthOnlyGuard>;
  }

  if (route.guestOnly) {
    return <GuestOnlyGuard path={route.path}>{route.element}</GuestOnlyGuard>;
  }

  return route.element;
};

export const renderRoutes = (routes: AppRouteObject[]) =>
  routes.map((route) => (
    <Route
      key={route.path || route.key}
      path={route.path}
      element={renderElement(route)}
    >
      {route.subRoutes &&
        route.subRoutes.length > 0 &&
        renderRoutes(route.subRoutes)}
    </Route>
  ));

export const APP_ROUTES: AppRouteObject[] = [
  {
    element: <GuestLayout />,
    guestOnly: true,
    key: 'guestLayoutWrapper',
    subRoutes: [
      { path: '/signIn', element: <SignInPage /> },
      { path: '/signUp', element: <SignUpPage /> },
    ],
  },

  {
    element: <AppLayout />,
    authOnly: true,
    key: 'appLayoutWrapper',
    subRoutes: [
      { path: '/', element: <MainPage /> },
      {
        path: '/projects',
        element: <ProjectsPage />,
      },
      {
        path: '/project/:id',
        element: <ProjectPage />,
      },
      {
        path: '/team',
        element: <TeamPage />,
      },
      {
        path: 'profile',
        element: <ProfilePage />,
      },
    ],
  },
];
