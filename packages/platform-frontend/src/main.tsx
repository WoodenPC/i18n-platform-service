import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from '@app/app';
import '@vkontakte/vkui/dist/vkui.css';
import { AdaptivityProvider, ConfigProvider } from '@vkontakte/vkui';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // @ts-ignore
  <ConfigProvider>
    {/* @ts-ignore */}
    <AdaptivityProvider>
      <App />
    </AdaptivityProvider>
  </ConfigProvider>
);
