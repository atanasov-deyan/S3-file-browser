import { MouseEvent, useMemo, useState } from 'react';

import { useFilesState } from '../store/storeFacade';
import { Icon } from './layout/Icon';
import { Button } from './layout/Button';
import { isFile } from '../utils/fileSystem';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROOT_DIR_NAME } from '../config';

import styles from './LeftSidebarFolder.module.css';
import { NavFolderList } from './NavFolderList';

interface ILeftSidebarFolderProps {
  name: string;
  parentPath: string;
}

const getFolders = (folderContent: string[]|undefined): string[] => {
  if (!folderContent) {
    return [];
  }

  return folderContent.filter((entry: string) => !isFile(entry));
};

export const NavFolder = ({ name, parentPath }: ILeftSidebarFolderProps) => {
  const { filesTree } = useFilesState();
  const [isExpanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const path = parentPath === ROOT_DIR_NAME ? `/${name}` : `${parentPath}/${name}`;

  const subFolders = useMemo(
    () => getFolders(filesTree[path]),
    [filesTree, path],
  );

  const iconName = isExpanded ? 'angle-down' : 'angle-right';
  const folderIconName = isExpanded ? 'folder-open-o' : 'folder-o';
  const isFolderSelected = pathname === path;

  const handleClick = (e: MouseEvent): void => {
    switch (e.detail) {
      case 1: {
        // only expand if there are sub-folders to display
        if (subFolders.length) {
          setExpanded(!isExpanded);
        }
        return;
      }

      case 2: {
        navigate(path);
        return;
      }

      default: {
        return;
      }
    }
  };

  return (
    <>
      <li className={isFolderSelected ? styles.active : ''}>
        <Button
        type='text'
        onClick={handleClick}
        className={isFolderSelected ? styles['active-button'] : ''}
        >
          <div className={styles['folder-container']}>
            {!!subFolders.length && (
              <>
                <Icon name={iconName}/>
                &nbsp;
              </>
            )}
            <Icon name={folderIconName}/>
            &nbsp;
            {name}
          </div>
        </Button>
      </li>

        {isExpanded && (
          <NavFolderList className={styles['folder-children']} folderPath={path}/>
        )}
    </>
  );
};
