import { FormField } from '../definitions/FormField';

const accessKeyIdField: FormField = {
  name: 'accessKeyId',
  required: true,
  placeholder: 'Enter access key id...',
  label: 'Access Key ID',
  type: 'text',
};

const secretAccessKeyField: FormField = {
  name: 'secretAccessKey',
  required: true,
  placeholder: 'Enter secret access key...',
  label: 'Secret Access Key',
  type: 'password',
};

const bucketNameField: FormField = {
  name: 'bucketName',
  required: true,
  placeholder: 'Enter bucket name...',
  label: 'Bucket Name',
  type: 'text',
};


export const loginFormFields: FormField[] = [
  accessKeyIdField,
  secretAccessKeyField,
  bucketNameField,
];
