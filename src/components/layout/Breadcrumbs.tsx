import { Link } from 'react-router-dom';

import { Icon } from './Icon';

import styles from './Breadcrumbs.module.css';

interface IBreadcrumbProps {
  pathname: string;
}

export const Breadcrumbs = ({ pathname }: IBreadcrumbProps) => {
  const path = pathname.split('/');

  const crumbs = path.slice(0, path.length - 1).map((name, i) => ({
    label: name === '' ? <Icon name='home' className={styles.root}/> : name,
    path: name === '' ? name : `${path.slice(0, i + 1).join('/')}`,
  }));

  const isRootDir = pathname === '/';

  return !isRootDir && (
    <div className={styles.breadcrumbs}>
      {crumbs.map(({ label, path }) => (
          <Link
            key={path}
            to={path}
            className={styles.link}
          >
            {label}
            &nbsp;
            <>/</>
          </Link>
        ))
      }
      <span className={styles.current} title='current directory'>
        {path.at(-1)}
      </span>
    </div>
  );
};
