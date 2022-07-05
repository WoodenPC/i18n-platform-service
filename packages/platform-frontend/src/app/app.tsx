import React from 'react';
import { AppRoot, ScreenSpinner } from '@vkontakte/vkui';
import { AppRouter } from './router';
import { initApp } from './init/init-app';

const App = () => {
  const [appInitialized, setIsAppInitalized] = React.useState(false);
  React.useEffect(() => {
    initApp().finally(() => {
      setIsAppInitalized(true);
    });
  }, []);

  return (
    <AppRoot>
      {!appInitialized && <ScreenSpinner />}
      {appInitialized && <AppRouter />}
    </AppRoot>
  );
};

export { App };
