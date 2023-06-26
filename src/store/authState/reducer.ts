import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { noop } from '../../utils/noop';

interface IAuthState {
  isAuthorized: boolean;
}

const initialState: IAuthState = {
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
  },
});

export const { authRequest, authSuccess, authFailure } = authSlice.actions;

export const authStateReducer = authSlice.reducer;
