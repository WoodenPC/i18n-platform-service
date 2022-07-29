import React from 'react';
import { SidebarItem } from '@shared/ui/sidebar';
import { TextTooltip } from '@vkontakte/vkui/dist/unstable';
import { NavLink } from 'react-router-dom';

import styles from './sidebar-menu.module.scss';

type SideBarMenuItemProps = {
  to: string;
  text?: string;
  icon: React.ReactNode;
};

export const SideBarMenuItem = ({ to, text, icon }: SideBarMenuItemProps) => (
  <SidebarItem>
    <NavLink to={to}>
      <TextTooltip text={text} placement='right'>
        <div className={styles.menuItem}>{icon}</div>
      </TextTooltip>
    </NavLink>
  </SidebarItem>
);
