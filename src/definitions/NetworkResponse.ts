import { Dictionary } from './Dictionary';

export type NetworkResponseSuccess = {
  body?: ReadableStream;
  headers?: Headers;
  ok?: boolean;
  status?: number;
  statusText?: string;
  url?: string;
}

export type NetworkResponseFailure = {
  body?: Dictionary<unknown> | null;
  status?: number;
  statusText?: string;
  message?: string;
  method?: 'GET' | 'POST' | 'PUT';
}

export type NetworkResponse = NetworkResponseSuccess | NetworkResponseFailure;
