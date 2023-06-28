import { Button } from './layout/Button';
import { Icon } from './layout/Icon';

import styles from './CreateFileBreadcrumbs.module.css';

interface ICreateFileBreadcrumbsProps {
  currentPath: string;
  setCurrentPath: (value: string) => void;
}

export const CreateFileBreadcrumbs = ({ currentPath, setCurrentPath }: ICreateFileBreadcrumbsProps) => {
  const newFolderPath = currentPath.split('/');
  const pathToDisplay = newFolderPath.slice(0, newFolderPath.length - 1);
  const currentLocation = newFolderPath.at(-1);

  return (
  <div className={styles.container}>
    {pathToDisplay.map((path, i) => (
      <Button
        size='small'
        type='text'
        key={pathToDisplay.slice(0, i + 1).join('/')}
        onClick={() => {
          const newPath = newFolderPath
            .slice(0, i + 1)
            .join('/');

          setCurrentPath(newPath);
        }}
      >
        {i === 0
          ? <Icon name='home' className={styles.root} title={'/'}/>
          : path
        }
        &nbsp;
        /
      </Button>
    ))}
    <Button
      size='small'
      type='text'
      className={styles.current}
      title='current'
    >
      {currentLocation}
    </Button>
  </div>
  );
};
