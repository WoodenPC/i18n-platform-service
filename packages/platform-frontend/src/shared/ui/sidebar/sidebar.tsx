import React from 'react';
import cn from 'classnames';

import './sidebar.scss';

type SideBarProps = {
  className?: string;
  children?: React.ReactNode;
};

export const SideBar = (props: SideBarProps) => {
  const { className, children } = props;
  return <div className={cn(className, 'sidebar')}>{children}</div>;
};
