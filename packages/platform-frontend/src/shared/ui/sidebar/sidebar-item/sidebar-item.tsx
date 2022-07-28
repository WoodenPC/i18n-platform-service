import React from 'react';
import cn from 'classnames';

import './sidebar-item.scss';

type SidebarItemProps = {
  children: React.ReactNode;
  className?: string;
};

export const SidebarItem = ({ children, className }: SidebarItemProps) => {
  return <li className={cn('SidebarItem', className)}>{children}</li>;
};
