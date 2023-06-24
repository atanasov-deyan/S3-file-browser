import { supportedFileExtensions, ROOT_DIR_NAME } from '../config';
import { Dictionary } from '../definitions/Dictionary';

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

  path.forEach((entry: string, i: number): void => {
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

// export const generateTree = (objects: string[]) => {
//   return objects.reduce((acc: Dictionary<string[]>, object: string): Dictionary<string[]> => {
//     const objectPath = object.split('/');

//     return objectPath.reduce((tree: Dictionary<string[]>, node: string, i: number): Dictionary<string[]> => {
//       const parentNode = i === 0 ? '/' : objectPath[i - 1];

//       return {
//         ...tree,
//         [parentNode]: acc[parentNode] ? filterDuplicates([...tree[parentNode], node]) : [node],
//       };
//     }, acc);
//   }, { '/': [] });
// };
