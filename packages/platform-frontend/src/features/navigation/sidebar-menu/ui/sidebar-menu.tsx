import { SideBar, SidebarBody, SidebarFooter } from '@shared/ui/sidebar';

import {
  Icon24GearOutline,
  Icon36Users,
  Icon24BookSpreadOutline,
} from '@vkontakte/icons';

import { SideBarMenuItem } from './sidebar-menu-item';

import styles from './sidebar-menu.module.scss';

export const SidebarMenu = () => (
  <SideBar className={styles.sidebarMenu}>
    <SidebarBody>
      <SideBarMenuItem
        text='Проекты'
        to='projects'
        icon={<Icon24BookSpreadOutline />}
      />
      <SideBarMenuItem text='Команда' to='team' icon={<Icon36Users />} />
    </SidebarBody>
    <SidebarFooter>
      <SideBarMenuItem
        text='Настройки'
        to='profile'
        icon={<Icon24GearOutline />}
      />
    </SidebarFooter>
  </SideBar>
);
