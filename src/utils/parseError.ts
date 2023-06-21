import { AWSError } from 'aws-sdk';

interface ParsedError {
  code?: string;
  message?: string;
  requestId?: string;
  statusCode?: number;
  retryable?: boolean;
  region?: string;
  time?: string;
}

export const parseError = (error: AWSError): ParsedError => {
  const err = Object.assign({}, error);

  return {
    ...err,
    time: err.time.toISOString(),
  };
};
