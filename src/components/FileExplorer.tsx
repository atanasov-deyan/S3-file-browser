import { MouseEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useFilesState, useLoadingState } from '../store/storeFacade';
import { isFile } from '../utils/fileSystem';
import { Icon } from './layout/Icon';
import { toClassName } from '../utils/toClassName';
import { Button } from './layout/Button';
import { Spin } from './layout/Spin';

import styles from './FileExplorer.module.css';
import { ROOT_DIR_NAME } from '../config';

const getIconName = (name: string): string => {
  return isFile(name) ? 'file-o' : 'folder';
};

const getClassName = (name: string): string => {
  return isFile(name)
    ? styles.icon
    : toClassName([styles.icon, styles['folder-icon']]);
};

export const FileExplorer = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate()
  const { filesTree } = useFilesState();
  const isLoading = useLoadingState('files/files');
  const content = filesTree[pathname];
  const handleClick = (name: string) => (e: MouseEvent) => {
    const isDir = !isFile(name);

    if (e.detail === 2) {
      if (isDir) {
        const folderPath = pathname === ROOT_DIR_NAME ? '' : pathname;
        navigate(`${folderPath}/${name}`);
      }
    }
  };

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', width: `calc(100vw - 300px)`}}>
        <div>
          <Spin spin/>
        </div>
      </div>
    );
  }

  return !!content && (
    <ul className={styles['folder-items']}>
      {content.map((name: string) => (
        <li key={name} className={styles['list-item']}>
          <Button
            type='text'
            onClick={handleClick(name)}
            className={styles.button}
            >
              <div className={styles.item}>
                <Icon name={getIconName(name)} className={getClassName(name)}/>
                <div className={styles['item-name']} title={name}>
                  {name}
                </div>
              </div>
            </Button>
        </li>
        ))}
    </ul>
  );
};
