import { IParsedError } from '../../utils/parseError';

import style from './ErrorMessage.module.css';

type BasicError = {
  message?: string;
  code: string;
};

interface IErrorMessageProps {
  error?: IParsedError | BasicError,
  showError: boolean
}

export const ErrorMessage = ({ error, showError }: IErrorMessageProps) => (showError && !!error) && (
  <span role="alert" id={`${error.code}-error`} className={style['error-message']}>
    {error.message}
  </span>
);
