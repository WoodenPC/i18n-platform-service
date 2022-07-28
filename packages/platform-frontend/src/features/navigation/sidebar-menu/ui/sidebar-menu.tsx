import React from 'react';
import {
  SideBar,
  SidebarBody,
  SidebarFooter,
  SidebarItem,
} from '@shared/ui/sidebar';

import classes from './sidebar-menu.module.scss';

export const SidebarMenu = () => {
  return (
    <SideBar>
      <SidebarBody>
        <SidebarItem>
          <div>Дашборд</div>
        </SidebarItem>
        <SidebarItem>
          <div>Команда</div>
        </SidebarItem>
      </SidebarBody>
      <SidebarFooter>
        <SidebarItem>Пользователь</SidebarItem>
      </SidebarFooter>
    </SideBar>
  );
};
