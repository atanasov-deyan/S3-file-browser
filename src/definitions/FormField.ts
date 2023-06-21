import { HTMLInputTypeAttribute } from 'react';

export interface IFormField {
  name: string,
  required?: boolean,
  placeholder?: string,
  label?: string,
  type: HTMLInputTypeAttribute,
}
