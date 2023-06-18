import { HTMLInputTypeAttribute  } from 'react'
export interface IFormField {
  name: string,
  required?: boolean,
  placeholder?: string,
  label?: string,
  type: HTMLInputTypeAttribute,
}

const accessKeyIdField: IFormField = {
  name: 'accessKeyId',
  required: true,
  placeholder: 'Enter access key id...',
  label: 'Access Key ID',
  type: 'text',
}

const secretAccessKeyField: IFormField = {
  name: 'secretAccessKey',
  required: true,
  placeholder: 'Enter secret access key...',
  label: 'Secret Access Key',
  type: 'password',
}

const bucketNameField: IFormField = {
  name: 'bucketName',
  required: true,
  placeholder: 'Enter bucket name...',
  label: 'Bucket Name',
  type: 'text',
}


export const loginFormFields: IFormField[] = [
  accessKeyIdField,
  secretAccessKeyField,
  bucketNameField,
]
