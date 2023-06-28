import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import { useFilesState, useLoadingState } from '../store/storeFacade';
import { Spin } from './layout/Spin';
import { FileExplorerItem } from './FileExplorerItem';
import { getNextAvailablePath } from '../utils/fileSystem';

import styles from './FileExplorer.module.css';

export const FileExplorer = () => {
  const { pathname } = useLocation();
  const { filesTree } = useFilesState();
  const navigate = useNavigate();
  const isLoading = useLoadingState('files/files');
  const content = filesTree[pathname];

  useEffect(() => {
    // upon initial boot we do not want to redirect the user since we will always only have the empty root dir;
    const tryToRedirect = !isLoading && typeof isLoading !== undefined;
    if (tryToRedirect && !filesTree[pathname]) {
      const redirectTo = getNextAvailablePath(pathname, filesTree);
      navigate(redirectTo);
    }
  /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [isLoading, pathname, filesTree]);

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
          <FileExplorerItem name={name}/>
        </li>
        ))}
    </ul>
  );
};
