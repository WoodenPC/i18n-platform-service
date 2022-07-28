import { SplitLayout } from '@vkontakte/vkui';
import { Outlet } from 'react-router-dom';

export const AppLayout = () => (
  <SplitLayout>
    <Outlet />
  </SplitLayout>
);
