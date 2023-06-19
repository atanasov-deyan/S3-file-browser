import { createSlice } from '@reduxjs/toolkit'
import { noop } from '../../utils/noop'
import { requestFailureActionReducer } from '../requestFailureActionCreator'

interface IAuthState {
  isAuthorized: boolean
}

const initialState: IAuthState = {
  isAuthorized: false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authRequest: noop,
    authSuccess: (state) => {
      state.isAuthorized = true
    },
    authFailure: requestFailureActionReducer,
  },
})

export const { authRequest, authSuccess, authFailure } = authSlice.actions

export const authStateReducer = authSlice.reducer
