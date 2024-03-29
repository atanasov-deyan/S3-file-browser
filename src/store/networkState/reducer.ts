import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Dictionary } from '../../definitions/Dictionary';
import { ParsedError } from '../../utils/parseError';

type AnyAction = {
  type: string;
  payload?: unknown;
}

type NetworkState = {
  loading: Dictionary<boolean>;
  errors: Dictionary<ParsedError | undefined>;
}

export const initialNetworkState: NetworkState = {
  loading: {},
  errors: {},
};


const isRequestAction = (action: AnyAction): boolean => !!action.type && action.type.endsWith('Request');

const isSuccessAction = (action: AnyAction): boolean => !!action.type && action.type.endsWith('Success');

const isFailureAction = (action: AnyAction): boolean => !!action.type && action.type.endsWith('Failure');


const getRequestName = (action: AnyAction) => {
  const matches = /(.*)(Request|Success|Failure)/.exec(action.type);
  if (matches) {
    const [, requestName] = matches;
    return requestName;
  }
  return '';
};

const networkStateSlice = createSlice({
  name: 'networkState',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState: initialNetworkState,
  reducers: {
    resetErrors: state => {
      state.errors = {};
    },
  },
  extraReducers: builder => {
    builder.addMatcher(isRequestAction, (state, action: AnyAction) => {
      const requestName = getRequestName(action);
      state.loading[requestName] = true;
    });
    builder.addMatcher(isSuccessAction, (state, action: AnyAction) => {
      const requestName = getRequestName(action);
      state.errors[requestName] = undefined;
      state.loading[requestName] = false;
    });
    builder.addMatcher(isFailureAction, (state, action: PayloadAction<ParsedError>) => {
      const requestName = getRequestName(action);
      state.errors[requestName] = action.payload;
      state.loading[requestName] = false;
    });
  },
});

export const {
  resetErrors,
} = networkStateSlice.actions;

export const networkStateReducer = networkStateSlice.reducer;
