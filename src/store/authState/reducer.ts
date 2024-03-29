import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { noop } from '../../utils/noop';

type AuthState = {
  isAuthorized: boolean;
}

const initialState: AuthState = {
  isAuthorized: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authRequest: noop,
    authSuccess: (state) => {
      state.isAuthorized = true;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    authFailure: (state, action: PayloadAction<unknown>) => {
      state.isAuthorized = false;
    },
    signOut: (state) => {
      state.isAuthorized = false;
    },
  },
});

export const { authRequest, authSuccess, authFailure, signOut } = authSlice.actions;

export const authStateReducer = authSlice.reducer;
