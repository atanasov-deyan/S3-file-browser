import { MouseEvent, useMemo, useState } from 'react';

import { useFilesState } from '../store/storeFacade';
import { isFile } from '../utils/fileSystem';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROOT_DIR_NAME } from '../config';
import { NavFolderList } from './NavFolderList';
import { NavFolderAction } from './NavFolderAction';

import styles from './NavFolder.module.css';

interface INavFolderProps {
  name: string;
  parentPath: string;
}

const getFolders = (folderContent: string[]|undefined): string[] => {
  if (!folderContent) {
    return [];
  }

  return folderContent.filter((entry: string) => !isFile(entry));
};

export const NavFolder = ({ name, parentPath }: INavFolderProps) => {
  const { filesTree } = useFilesState();
  const [isExpanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const path = parentPath === ROOT_DIR_NAME ? `/${name}` : `${parentPath}/${name}`;

  const subFolders = useMemo(
    () => getFolders(filesTree[path]),
    [filesTree, path],
  );

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
        <NavFolderAction
          onClick={handleClick}
          isFolderSelected={isFolderSelected}
          hasSubFolders={!!subFolders.length}
          name={name}
          isExpanded={isExpanded}
        />
      </li>

      {isExpanded && (
        <NavFolderList className={styles['sub-folders']} folderPath={path}/>
      )}
    </>
  );
};
