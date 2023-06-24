import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { noop } from '../../utils/noop';
import { requestFailureActionReducer } from '../requestFailureActionCreator';
import { IObject } from '../../definitions/IObject';
import { Dictionary } from '../../definitions/Dictionary';

type FilesTree = Dictionary<string[]>;

interface IFilesState {
  allObjects: IObject[];
  filesTree: FilesTree;
}

const initialState: IFilesState = {
  allObjects: [],
  filesTree: {},
};

export const filesSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {
    filesRequest: noop,
    filesSuccess: (state, action: PayloadAction<{ allObjects: IObject[], filesTree: FilesTree}>) => {
      const { allObjects, filesTree } = action.payload;
      state.allObjects = allObjects;
      state.filesTree = filesTree;
    },
    filesFailure: requestFailureActionReducer,
  },
});

export const { filesRequest, filesSuccess, filesFailure } = filesSlice.actions;

export const filesStateReducer = filesSlice.reducer;
