import { Link } from 'react-router-dom';

import { Icon } from './Icon';

import styles from './Breadcrumbs.module.css';

export const Breadcrumbs = ({ pathname }: { pathname: string }) => {
  const path = pathname.split('/');

  const crumbs = path.slice(0, path.length - 1).map((name, i) => ({
    label: i === 0 ? <Icon name='home' className={styles.root}/> : name,
    path: i === 0 ? '/' : `${path.slice(0, i + 1).join('/')}`,
  }));
  const isRootDir = pathname === '/';

  return !isRootDir && (
    <div className={styles.breadcrumbs}>
      {crumbs.map(({ label, path }, i) => (
          <Link
            key={path}
            to={path}
            className={styles.link}
          >
            {label}
            &nbsp;
            {(i < crumbs.length - 1) && (
              <>/</>
            )}
          </Link>
        ))
      }
    </div>
  );
};
