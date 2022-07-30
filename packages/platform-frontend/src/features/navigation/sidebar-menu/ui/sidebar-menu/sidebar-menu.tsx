import {
  SideBar,
  SidebarBody,
  SidebarFooter,
  SidebarItem,
} from '@shared/ui/sidebar';

import {
  Icon24GearOutline,
  Icon36Users,
  Icon24BookSpreadOutline,
} from '@vkontakte/icons';

import { RichTooltip } from '@vkontakte/vkui/dist/unstable';
import { SideBarMenuItem } from './sidebar-menu-item';
import { UserContextMenu } from '../user-context-menu';

import styles from './sidebar-menu.module.scss';

export const SidebarMenu = () => {
  return (
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
        <SidebarItem>
          <RichTooltip
            placement='right-end'
            offsetSkidding={-10}
            content={<UserContextMenu />}
          >
            <div className={styles.menuItem}>
              <Icon24GearOutline />
            </div>
          </RichTooltip>
        </SidebarItem>
      </SidebarFooter>
    </SideBar>
  );
};
