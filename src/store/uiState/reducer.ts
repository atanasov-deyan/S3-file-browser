import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { noop } from '../../utils/noop';

type FilePreviewModalState = {
  isVisible: boolean,
  fileKey: null | string,
}

interface IUiState {
  filePreviewModal: FilePreviewModalState;
}

const initialState: IUiState = {
  filePreviewModal: {
    isVisible: false,
    fileKey: null,
  },
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openFilePreviewModal: (state, action: PayloadAction<{ fileKey: string }>) => {
      const { fileKey } = action.payload;
      state.filePreviewModal = {
        isVisible: true,
        fileKey,
      };
    },
    closeFilePreviewModal: (state) => {
      state.filePreviewModal = {
        ...initialState.filePreviewModal,
      };
    },
  },
});

export const { openFilePreviewModal, closeFilePreviewModal } = uiSlice.actions;

export const uiStateReducer = uiSlice.reducer;
