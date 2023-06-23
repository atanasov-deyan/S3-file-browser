import { AWSError } from 'aws-sdk';

export interface IParsedError {
  code: string;
  message: string;
  requestId?: string;
  statusCode?: number;
  retryable?: boolean;
  region?: string;
  time?: string;
}

export const parseError = (error: AWSError): IParsedError => {
  const err = Object.assign({}, error);

  return {
    ...err,
    time: err.time.toISOString(),
  };
};
