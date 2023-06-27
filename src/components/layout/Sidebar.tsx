import { ReactNode } from 'react';

import { toClassName } from '../../utils/toClassName';

import styles from './Sidebar.module.css' ;

interface ISidebarProps {
  className?: string;
  children: ReactNode;
}

export const Sidebar = ({ className, children }: ISidebarProps) => {

  const sidebarClassName = toClassName([styles.sidebar, className]);

  return (
    <aside className={sidebarClassName}>
      {children}
    </aside>
  );
};
