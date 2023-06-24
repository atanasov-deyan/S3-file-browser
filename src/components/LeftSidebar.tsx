
import { Sidebar } from './layout/Sidebar';
import { ROOT_DIR_NAME } from '../config';
import { NavFolderList } from './NavFolderList';

export const LeftSidebar = () => (
  <Sidebar>
    <NavFolderList folderPath={ROOT_DIR_NAME}/>
  </Sidebar>
);
