import { AWSError } from 'aws-sdk';

import { s3Service } from '../../services/S3Service';
import { dispatch } from '../storeFacade';
import { filesFailure, filesRequest, filesSuccess } from './reducer';
import { parseError } from '../../utils/parseError';
import { Object } from 'aws-sdk/clients/s3';
import { IObject } from '../../definitions/IObject';
import { generateTree } from '../../utils/fileSystem';

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
        .filter((str: string | undefined): str is string => !!str),
    );

    dispatch(filesSuccess({ allObjects, filesTree }));
  } catch (e) {
    dispatch(filesFailure(parseError(e as AWSError)));
  }
};
