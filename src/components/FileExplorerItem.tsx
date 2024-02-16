import { MouseEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { isFile } from '../utils/fileSystem';
import { Icon } from './layout/Icon';
import { toClassName } from '../utils/toClassName';
import { Button } from './layout/Button';
import { ROOT_DIR_NAME } from '../config';
import { dispatch, useUiState } from '../store/storeFacade';
import { openFilePreviewModal, setFileKeyToDelete } from '../store/uiState/reducer';

import styles from './FileExplorerItem.module.css';

type Props = {
  name: string;
}

export const FileExplorerItem = ({ name }: Props) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { fileKeyToDelete } = useUiState();

  const isDir = !isFile(name);
  const iconName = isDir ? 'folder' : 'file-o';
  const entityPath = pathname === ROOT_DIR_NAME ? name : `${pathname.slice(1)}/${name}`;
  const isSelected = entityPath === fileKeyToDelete;

  const iconClass = isSelected ? toClassName([styles.icon, styles['icon-selected']]) : styles.icon;

  const handleClick = (e: MouseEvent) => {
    if (e.detail === 1) {
       dispatch(setFileKeyToDelete({ fileKey: entityPath }));
    }
    if (e.detail === 2) {
      if (isDir) {
        navigate(`/${entityPath}`);
      } else {
        dispatch(openFilePreviewModal({ fileKey: entityPath }));
        dispatch(setFileKeyToDelete({ fileKey: null }));
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
