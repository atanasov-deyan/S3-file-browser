import { AnyAction } from '@reduxjs/toolkit';
import { shallowEqual } from 'react-redux';

import store from './index';
import { useAppSelector } from './hooks';
import { IParsedError } from '../utils/parseError';

export const dispatch = (action: AnyAction): void => {
  store.dispatch(action);
};

export const useNetworkState = () => useAppSelector(
  state => state.networkState,
  shallowEqual,
);

export const useLoadingState = (actionName: string): boolean => useAppSelector(
  (state) => state.networkState.loading[actionName],
  shallowEqual,
);

export const useErrorState = (actionName: string): IParsedError|undefined => useAppSelector(
  (state) => state.networkState.errors[actionName],
  shallowEqual,
);

export const useAuthState = () => useAppSelector(
  (state) => state.authState,
  shallowEqual,
);

export const useFilesState = () => useAppSelector(
  (state) => state.filesState,
  shallowEqual,
);
