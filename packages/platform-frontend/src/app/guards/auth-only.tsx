import { userHooks } from '@entities/user';
import { ScreenSpinner } from '@vkontakte/vkui';
import React from 'react';
import { useNavigate } from 'react-router-dom';

type AuthOnlyGuardProps = {
  children: React.ReactNode;
};

export const AuthOnlyGuard = ({
  children,
}: AuthOnlyGuardProps): JSX.Element | null => {
  const { user, isLoading } = userHooks.useUser();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isLoading) {
      if (user) {
        navigate('/', {
          replace: true,
        });
      } else {
        navigate('/signIn', {
          replace: true,
        });
      }
    }
  }, [user, isLoading]);

  if (!children) {
    return null;
  }

  if (isLoading) {
    return <ScreenSpinner />;
  }

  if (user) {
    return children as React.ReactElement;
  }

  return null;
};
