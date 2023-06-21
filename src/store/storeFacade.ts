import { AnyAction } from '@reduxjs/toolkit';
import { shallowEqual } from 'react-redux';

import store from './index';
import { useAppSelector } from './hooks';

export const dispatch = (action: AnyAction): void => {
  store.dispatch(action);
};

export const useLoadingState = (actionName: string): boolean => useAppSelector(
  (state) => state.networkState.loading[actionName],
  shallowEqual,
);

export const useAuthState = () => useAppSelector(
  (state) => state.authState,
  shallowEqual,
);
