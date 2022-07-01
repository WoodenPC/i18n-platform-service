import React from 'react';
import { AppRoot } from '@vkontakte/vkui';
import { AppRouter } from './router';

const App = () => {
  React.useEffect(() => {
    // init app
  }, []);

  return (
    <AppRoot>
      <AppRouter />
    </AppRoot>
  )
}

export { App };
