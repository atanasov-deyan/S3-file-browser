import { useLocation } from 'react-router-dom';

import { useFilesState, useLoadingState } from '../store/storeFacade';
import { Spin } from './layout/Spin';
import { FileExplorerItem } from './FileExplorerItem';

import styles from './FileExplorer.module.css';

export const FileExplorer = () => {
  const { pathname } = useLocation();
  const { filesTree } = useFilesState();
  const isLoading = useLoadingState('files/files');
  const content = filesTree[pathname];

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
