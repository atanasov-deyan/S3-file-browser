import { Object, ObjectKey } from 'aws-sdk/clients/s3';

export interface IObject extends Omit<Object, 'LastModified'> {
  LastModified?: string;
  Key: ObjectKey;
}
