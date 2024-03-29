import { MouseEventHandler } from 'react';

import { Icon } from './layout/Icon';
import { Button } from './layout/Button';

import styles from './NavFolderAction.module.css';

type Props = {
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
}: Props) => {
  const angleIconName = isExpanded ? 'angle-down' : 'angle-right';
  const folderIconName = isExpanded ? 'folder-open-o' : 'folder-o';

  return (
    <Button
      type='text'
      onClick={onClick}
      className={isFolderSelected ? styles['active-button'] : ''}
    >
      <div className={styles['folder-name']}>
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
  );
};
