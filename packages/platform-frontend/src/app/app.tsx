import React from 'react';
import { AppRoot } from '@vkontakte/vkui';
import { AppRouter } from './router';
import { initApp } from './init/init-app';

const App = () => {
  React.useEffect(() => {
    initApp();
  }, []);

  return (
    <AppRoot>
      <AppRouter />
    </AppRoot>
  )
}

export { App };
