import { userHooks } from '@entities/user';
import { ScreenSpinner } from '@vkontakte/vkui';
import React from 'react';
import { useNavigate } from 'react-router-dom';

type GuestOnlyGuardProps = {
  children: React.ReactNode;
  path?: string;
};

export const GuestOnlyGuard = ({
  children,
  path,
}: GuestOnlyGuardProps): JSX.Element | null => {
  const { user, isLoading } = userHooks.useUser();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isLoading) {
      if (user) {
        navigate('/', {
          replace: true,
        });
      } else {
        navigate(path || '/signIn', {
          replace: true,
        });
      }
    }
  }, [user, isLoading, path]);

  if (!children) {
    return null;
  }

  if (isLoading || !!user) {
    return <ScreenSpinner />;
  }

  return children as React.ReactElement;
};
