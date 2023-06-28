import { AWSError } from 'aws-sdk';
import { Object, ObjectKey } from 'aws-sdk/clients/s3';

import { s3Service } from '../../services/S3Service';
import { dispatch } from '../storeFacade';
import { createFileFailure, createFileRequest, createFileSuccess, deleteFileFailure, deleteFileRequest, deleteFileSuccess, filesFailure, filesRequest, filesSuccess } from './reducer';
import { parseError } from '../../utils/parseError';
import { IObject } from '../../definitions/IObject';
import { generateTree } from '../../utils/fileSystem';
import { noop } from '../../utils/noop';

const parseObject = (object: Object): IObject => ({
  ...object,
  LastModified: object.LastModified?.toISOString(),
  Key: object.Key,
});

export const getAllFiles = async (): Promise<void> => {
  dispatch(filesRequest());

  try {
    const response = await s3Service.listObjects();
    const allObjects = response.Contents?.map(o => parseObject(o)) ?? [];

    const filesTree = generateTree(
      allObjects
        .map(o => o.Key)
        .filter((key: string | undefined): key is string => !!key),
    );

    dispatch(filesSuccess({ allObjects, filesTree }));
  } catch (e) {
    dispatch(filesFailure(parseError(e as AWSError)));
  }
};

export const createFile = async (key: ObjectKey, content: string, callback: VoidFunction = noop) => {
  dispatch(createFileRequest());

  try {
    await s3Service.createObject(key, content);
    dispatch(createFileSuccess());
    callback();
  } catch (e) {
    dispatch(createFileFailure(parseError(e as AWSError)));
  }
};

export const deleteFile = async (entityPath: string, allObjects: IObject[], callback: VoidFunction = noop) => {
  dispatch(deleteFileRequest());

  const objectKeysToDelete = allObjects
    .map(({ Key }) => Key)
    .filter((key: string | undefined): key is string => !!key)
    // in case we are deleting a dir instead of a file, we do not want to leave empty dirs
    .filter((key) => key.startsWith(entityPath));

  try {
    await Promise.all(objectKeysToDelete.map(key => s3Service.deleteObject(key)));
    dispatch(deleteFileSuccess());
    callback();
  } catch (e) {
    dispatch(deleteFileFailure(parseError(e as AWSError)));
  }
};
