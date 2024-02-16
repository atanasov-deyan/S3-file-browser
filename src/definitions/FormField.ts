import { HTMLInputTypeAttribute } from 'react';

export type FormField = {
  name: string;
  required?: boolean;
  placeholder?: string;
  label?: string;
  type: HTMLInputTypeAttribute;
}
