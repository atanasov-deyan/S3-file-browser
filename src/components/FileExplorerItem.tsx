import { MouseEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { isFile } from '../utils/fileSystem';
import { Icon } from './layout/Icon';
import { toClassName } from '../utils/toClassName';
import { Button } from './layout/Button';
import { ROOT_DIR_NAME } from '../config';

import styles from './FileExplorerItem.module.css';
import { dispatch } from '../store/storeFacade';
import { openFilePreviewModal } from '../store/uiState/reducer';

interface IFileExplorerItemProps {
  name: string;
}

export const FileExplorerItem = ({ name }: IFileExplorerItemProps) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isFolder = !isFile(name);
  const iconName = isFolder ? 'folder' : 'file-o';
  const iconClass = isFolder ? toClassName([styles.icon, styles['folder-icon']]) : styles.icon;

  const handleClick = (e: MouseEvent) => {
    const isDir = !isFile(name);

    if (e.detail === 2) {
      if (isDir) {
        const folderPath = pathname === ROOT_DIR_NAME ? '' : pathname;
        navigate(`${folderPath}/${name}`);
      } else {
        // remove the initial "/" to obtain fileKey
        const folderPath = pathname.slice(1);
        const fileKey = pathname === ROOT_DIR_NAME ? name : `${folderPath}/${name}`;
        dispatch(openFilePreviewModal({ fileKey }));
      }
    }
  };

  return (
    <Button
      type='text'
      onClick={handleClick}
      className={styles.button}
      >
        <div className={styles.item}>
          <Icon name={iconName} className={iconClass}/>
          <div className={styles['item-name']} title={name}>
            {name}
          </div>
        </div>
      </Button>
  );
};
