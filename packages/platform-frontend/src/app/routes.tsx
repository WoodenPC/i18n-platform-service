import { SignInPage } from '@pages/sign-in';
import { SignUpPage } from '@pages/sign-up';
import React from 'react';
import { Route } from 'react-router-dom';
import { GuestOnlyGuard } from './guards/guest-only';
import { AuthOnlyGuard } from './guards/auth-only';

type AppRouteObject = {
  path: string;
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
    <Route key={route.path} path={route.path} element={renderElement(route)}>
      {route.subRoutes &&
        route.subRoutes.length > 0 &&
        renderRoutes(route.subRoutes)}
    </Route>
  ));

export const APP_ROUTES: AppRouteObject[] = [
  { path: '/', authOnly: true, element: <div>page</div> },
  { path: '/signIn', element: <SignInPage />, guestOnly: true },
  { path: '/signUp', element: <SignUpPage />, guestOnly: true },
  {
    path: '/groups/:groupId',
    authOnly: true,
  },
  {
    path: '/groups/:groupId/projects',
    authOnly: true,
  },
  {
    path: '/groups/:groupId/projects/:projectId',
    authOnly: true,
  },
];
