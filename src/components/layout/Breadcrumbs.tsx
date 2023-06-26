import { Link, useLocation } from 'react-router-dom';
import { Icon } from './Icon';

import styles from './Breadcrumbs.module.css';

export const Breadcrumbs = () => {
  const { pathname } = useLocation();

  const path = pathname.split('/');

  const crumbs = path.slice(0, path.length - 1).map((name, i) => ({
    label: i === 0 ? <Icon name='home' className={styles.root}/> : name,
    path: i === 0 ? '/' : `${path.slice(0, i + 1).join('/')}`,
  }));

  return crumbs.length > 1 && (
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
