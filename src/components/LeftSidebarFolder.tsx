import { MouseEvent, useState } from 'react';

import { useFilesState } from '../store/storeFacade';
import { Icon } from './layout/Icon';
import { Button } from './layout/Button';
import { isFile } from '../utils/fileSystem';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROOT_DIR_NAME } from '../config';

import styles from './LeftSidebarFolder.module.css';

interface ILeftSidebarFolderProps {
  name: string;
  parentPath: string;
}

const getFolders = (folderChildren: string[]|undefined): string[]|undefined => {
  if (!folderChildren) {
    return;
  }

  return folderChildren.filter((entry: string) => !isFile(entry));
};

export const LeftSidebarFolder = ({ name, parentPath }: ILeftSidebarFolderProps) => {
  const { filesTree } = useFilesState();
  const [isExpanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const path = parentPath === ROOT_DIR_NAME ? `/${name}` : `${parentPath}/${name}`;

  const folderChildren = getFolders(filesTree[path]);
  const iconName = isExpanded ? 'angle-down' : 'angle-right';
  const folderIconName = isExpanded ? 'folder-open-o' : 'folder-o';
  const isFolderSelected = pathname === path;

  const handleClick = (e: MouseEvent): void => {
    switch (e.detail) {
      case 1: {
        // user clicking on folder without any children to visualize should not result in expanding it
        if (folderChildren?.length) {
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
            {!!folderChildren?.length && (
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

        {(!!folderChildren && isExpanded) && (
          <ul className={styles['folder-children']}>
            {folderChildren.map(childName => (
              <LeftSidebarFolder key={childName} name={childName} parentPath={path}/>
            ))}
          </ul>
        )}
    </>
  );
};
