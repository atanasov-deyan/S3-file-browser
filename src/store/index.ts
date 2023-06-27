import { configureStore } from '@reduxjs/toolkit';

import { authStateReducer } from './authState/reducer';
import { networkStateReducer } from './networkState/reducer';
import { filesStateReducer } from './filesState/reducer';
import { uiStateReducer } from './uiState/reducer';

const store = configureStore({
  reducer: {
    authState: authStateReducer,
    filesState: filesStateReducer,
    networkState: networkStateReducer,
    uiState: uiStateReducer,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
