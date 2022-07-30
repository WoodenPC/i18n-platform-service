import React from 'react';
import ReactDOM from 'react-dom/client';
import '@vkontakte/vkui/dist/vkui.css';
import '@vkontakte/vkui/dist/unstable.css';
import { App } from '@app/app';

import { AdaptivityProvider, ConfigProvider } from '@vkontakte/vkui';

import '@shared/styles/_main.scss';

// test comment

ReactDOM.createRoot(document.getElementById('root')!).render(
  // @ts-ignore
  <ConfigProvider>
    {/* @ts-ignore */}
    <AdaptivityProvider>
      <App />
    </AdaptivityProvider>
  </ConfigProvider>
);
