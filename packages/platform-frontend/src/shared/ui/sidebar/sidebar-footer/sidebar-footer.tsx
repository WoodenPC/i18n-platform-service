import React from 'react';
import cn from 'classnames';

import './sidebar-footer.scss';

type SidebarFooterProps = {
  children: React.ReactNode;
  className?: string;
};

export const SidebarFooter = ({ children, className }: SidebarFooterProps) => {
  return <ul className={cn('sidebarFooter', className)}>{children}</ul>;
};
