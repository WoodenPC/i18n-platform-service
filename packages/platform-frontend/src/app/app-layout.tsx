import { SplitCol, SplitLayout } from '@vkontakte/vkui';
import { Outlet } from 'react-router-dom';

import { SidebarMenu } from '@features/navigation/sidebar-menu/ui/sidebar-menu';

const SIDEBAR_WIDTH = 72;

export const AppLayout = () => (
  <SplitLayout>
    <SplitCol width={SIDEBAR_WIDTH} maxWidth={SIDEBAR_WIDTH}>
      <SidebarMenu />
    </SplitCol>
    <SplitCol>
      <Outlet />
    </SplitCol>
  </SplitLayout>
);
