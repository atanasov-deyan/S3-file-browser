import { useFilesState } from '../store/storeFacade';
import { isFile } from '../utils/fileSystem';
import { LeftSidebarFolder } from './LeftSidebarFolder';

interface INavFolderListProps {
  className?: string;
  folderPath: string;
}

export const NavFolderList = ({ className, folderPath }: INavFolderListProps) => {
  const { filesTree } = useFilesState();
  const { [folderPath]: folderContent } = filesTree;
  const folders = folderContent?.filter((entry) => !isFile(entry));

  return !!folders && (
    <ul className={className}>
      {folders.map(entry => (
        <LeftSidebarFolder key={entry} name={entry} parentPath={folderPath}/>
      ))}
    </ul>
  );
};
