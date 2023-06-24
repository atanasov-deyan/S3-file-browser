import { useFilesState } from '../store/storeFacade';
import { isFile } from '../utils/fileSystem';
import { Sidebar } from './layout/Sidebar';
import { ROOT_DIR_NAME } from '../config';
import { LeftSidebarFolder } from './LeftSidebarFolder';

export const LeftSidebar = () => {
  const { filesTree } = useFilesState();
  const { [ROOT_DIR_NAME]: rootData } = filesTree;

  return (
    <Sidebar>
      <ul>
        {rootData.filter(entry => !isFile(entry)).map(entry => (
          <LeftSidebarFolder key={entry} name={entry} parentPath={ROOT_DIR_NAME}/>
        ))}
      </ul>
    </Sidebar>
  );
};
