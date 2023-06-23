import { Dictionary } from '../definitions/Dictionary';

const filterDuplicates = (array: string[]): string[] => Array.from(
  new Set(array),
);

const generateTree = (objects: string[]) => {
    const tree: Dictionary<string[]> = {
    '/': [],
    };

  for (const object of objects) {
    const path = object.split('/');

    path.forEach((entry: string, i: number): void => {
      /* todo create absolute path to avoid case of having same folder names in different parts of the fs, which will mess up
      // data visualisation. Desired behaviour:
      sample data: ['object1.txt', 'prefix/object2.txt', 'prefix/suffix/object3.txt']

      treemap:
      {
        '/': ['prefix', 'object1.txt'],
        '/prefix': ['suffix', 'object2.txt'],
        '/prefix/suffix': ['object3.txt']
      }
      */
      const parentNode = i === 0 ? '/' : path[i - 1];
      tree[parentNode]
          ? tree[parentNode] = filterDuplicates([...tree[parentNode], entry]).sort((a: string,): boolean => !a.includes('.txt'))
          : tree[parentNode] = [entry];
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
