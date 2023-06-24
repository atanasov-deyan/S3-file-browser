import { MouseEventHandler } from 'react';

import { Icon } from './layout/Icon';
import { Button } from './layout/Button';

import styles from './LeftSidebarFolder.module.css';

interface INavFolderActionProps {
  onClick: MouseEventHandler;
  isFolderSelected: boolean;
  hasSubFolders: boolean;
  name: string;
  isExpanded: boolean;
}

export const NavFolderAction = ({
  onClick,
  isFolderSelected,
  hasSubFolders,
  name,
  isExpanded,
}: INavFolderActionProps) => {
  const angleIconName = isExpanded ? 'angle-down' : 'angle-right';
  const folderIconName = isExpanded ? 'folder-open-o' : 'folder-o';

  return (
    <Button
      type='text'
      onClick={onClick}
      className={isFolderSelected ? styles['active-button'] : ''}
    >
      <div className={styles['folder-container']}>
        {!!hasSubFolders && (
          <>
            <Icon name={angleIconName}/>
            &nbsp;
          </>
        )}
        <Icon name={folderIconName}/>
        &nbsp;
        {name}
      </div>
    </Button>
  )
}
