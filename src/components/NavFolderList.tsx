import { useFilesState } from '../store/storeFacade';
import { isFile } from '../utils/fileSystem';
import { NavFolder } from './NavFolder';

type Props = {
  className?: string;
  folderPath: string;
}

export const NavFolderList = ({ className, folderPath }: Props) => {
  const { filesTree } = useFilesState();
  const { [folderPath]: folderContent } = filesTree;
  const folders = folderContent?.filter((entry) => !isFile(entry));

  return !!folders && (
    <ul className={className}>
      {folders.map(folderName => (
        <NavFolder key={folderName} name={folderName} parentPath={folderPath}/>
      ))}
    </ul>
  );
};
