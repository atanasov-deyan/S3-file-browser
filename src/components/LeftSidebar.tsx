import React from 'react';
import { useFilesState } from '../store/storeFacade';
import { isFile } from '../utils/fileSystem';
import { Sidebar } from './layout/Sidebar';
import { Icon } from './layout/Icon';
import { ROOT_DIR_NAME } from '../config';

export const LeftSidebar = () => {
  const { filesTree } = useFilesState();
  const { [ROOT_DIR_NAME]: rootData } = filesTree;

  return (
    <Sidebar>
      <ul>
        {rootData.filter(entry => !isFile(entry)).map(entry => (
          <li key={entry}>
            <Icon name='arrow-down'/>
            {entry}
          </li>
        ))}
      </ul>
    </Sidebar>
  );
};
