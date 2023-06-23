import { supportedFileExtensions } from '../config/supportedFileExtensions';

const getFileExtension = (name: string): string => {
  return name.slice(name.length - 4);
};

export const isFile = (entityName: string): boolean => {
  return supportedFileExtensions.has(getFileExtension(entityName));
};
