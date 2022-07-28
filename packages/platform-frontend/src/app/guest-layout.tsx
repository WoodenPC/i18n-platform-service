import { SplitLayout } from '@vkontakte/vkui';
import { Outlet } from 'react-router-dom';

export const GuestLayout = () => (
  <SplitLayout>
    <Outlet />
  </SplitLayout>
);
