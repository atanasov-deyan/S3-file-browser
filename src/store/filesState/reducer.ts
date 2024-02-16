import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { noop } from '../../utils/noop';
import { requestFailureActionReducer } from '../requestFailureActionCreator';
import { IObject } from '../../definitions/IObject';
import { Dictionary } from '../../definitions/Dictionary';
import { ROOT_DIR_NAME } from '../../config';

export type FilesTree = Dictionary<string[]>;

export enum FilesEventEnum {
  SYNC_FILES = 'SYNC_FILES',
}

type FilesState = {
  allObjects: IObject[];
  filesTree: FilesTree;
  eventTracker: FilesEventEnum | null;
}

const initialState: FilesState = {
  allObjects: [],
  filesTree: {
    [ROOT_DIR_NAME]: [],
  },
  eventTracker: null,
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
    createFileRequest: noop,
    createFileSuccess: noop,
    createFileFailure: requestFailureActionReducer,
    deleteFileRequest: noop,
    deleteFileSuccess: noop,
    deleteFileFailure: requestFailureActionReducer,
    trackFilesEvent: (state, action: PayloadAction<{ eventTracker: FilesEventEnum | null}>) => {
      state.eventTracker = action.payload.eventTracker;
    },
  },
});

export const {
  filesRequest,
  filesSuccess,
  filesFailure,
  createFileRequest,
  createFileSuccess,
  createFileFailure,
  deleteFileRequest,
  deleteFileSuccess,
  deleteFileFailure,
  trackFilesEvent,
} = filesSlice.actions;

export const filesStateReducer = filesSlice.reducer;
