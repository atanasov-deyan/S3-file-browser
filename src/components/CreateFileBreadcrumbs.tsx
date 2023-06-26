import { Button } from './layout/Button';

interface ICreateFileBreadcrumbsProps {
  pathname: string;
  currentPath: string;
  setCurrentPath: (value: string) => void;
}

export const CreateFileBreadcrumbs = ({ pathname, currentPath, setCurrentPath }: ICreateFileBreadcrumbsProps) => {
  const newFolderPath = currentPath
    .replace(pathname, '')
    .split('/')
    .filter(Boolean);

  return (
  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
    {newFolderPath.map((path, i) => (
      <Button
        size='small'
        type='text'
        key={i}
        onClick={() => {
          const path = newFolderPath.slice(0, i + 1).join('/');
          const newPath = pathname === '/' ? `/${path}` : `${pathname}/${path}`;
          setCurrentPath(newPath);
        }}
      >
        {path}
        &nbsp;
        /
        &nbsp;
      </Button>
    ))}
  </div>
  );
};
