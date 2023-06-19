import { AnyAction } from '@reduxjs/toolkit'
import store from './index'
import { shallowEqual } from 'react-redux'
import { useAppSelector } from './hooks'

export const dispatch = (action: AnyAction): void => {
  store.dispatch(action);
};

export const useLoadingState = (actionName: string): boolean =>  useAppSelector(
  (state) => state.networkState.loading[actionName],
  shallowEqual,
);
