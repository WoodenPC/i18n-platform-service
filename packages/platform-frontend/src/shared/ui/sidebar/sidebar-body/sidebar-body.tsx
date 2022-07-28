import React from 'react';
import cn from 'classnames';

import './sidebar-body.scss';

type SidebarBodyProps = {
  children: React.ReactNode;
  className?: string;
};

export const SidebarBody = ({ children, className }: SidebarBodyProps) => {
  return <ul className={cn('sidebarBody', className)}>{children}</ul>;
};
