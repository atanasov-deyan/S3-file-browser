import React from 'react'

import { IParsedError } from '../../utils/parseError';

import style from './ErrorMessage.module.css';

interface IErrorMessageProps {
  error?: IParsedError,
  showError: boolean
}

export const ErrorMessage = ({ error, showError }: IErrorMessageProps) => (showError && !!error) && (
  <span role="alert" id={`${error.code}-error`} className={style['error-message']}>
    {error.message}
  </span>
);
