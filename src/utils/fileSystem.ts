import { supportedFileExtensions, ROOT_DIR_NAME } from '../config';
import { Dictionary } from '../definitions/Dictionary';
import { FilesTree } from '../store/filesState/reducer';

const filterDuplicates = (array: string[]): string[] => Array.from(
  new Set(array),
);

const getFileExtension = (name: string): string => {
  const parsedName = name.split('.');
  const fileExtension = parsedName.length > 1
    ? parsedName[parsedName.length - 1]
    : '';

  return fileExtension;
};

export const isFile = (entityName: string): boolean => {
  return supportedFileExtensions.has(getFileExtension(entityName));
};

export const generateTree = (objectKeys: string[]): Dictionary<string[]> => {
  const tree: Dictionary<string[]> = {
    ROOT_DIR_NAME: [],
  };

for (const object of objectKeys) {
  const path = object.split('/');

  path.forEach((entry, i) => {
    const parentNodePath = i === 0
      ? ROOT_DIR_NAME
      : `/${path.slice(0, i).join('/')}`;

    tree[parentNodePath]
        ? tree[parentNodePath] = filterDuplicates([...tree[parentNodePath], entry])
        : tree[parentNodePath] = [entry];
  });
}

  return tree;
};

export const getNextAvailablePath = (userPath: string, filesTree: FilesTree): string => {
  const path = userPath.split('/');
  let nextAvailablePath: string | null = null;

  for (let i = path.length; i >= 0; i--) {
    const redirect = path.slice(0, i).join('/');
    if (redirect in filesTree && !nextAvailablePath) {
      nextAvailablePath = redirect
      break;
    }
  }

  return nextAvailablePath ?? ROOT_DIR_NAME;
};
