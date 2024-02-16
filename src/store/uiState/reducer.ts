import { ObjectKey } from 'aws-sdk/clients/s3';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type FilePreviewModalState = {
  isVisible: boolean,
  fileKey: ObjectKey | null,
}

type UiState = {
  filePreviewModal: FilePreviewModalState;
  fileKeyToDelete: ObjectKey | null,
}

const initialState: UiState = {
  filePreviewModal: {
    isVisible: false,
    fileKey: null,
  },
  fileKeyToDelete: null,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openFilePreviewModal: (state, action: PayloadAction<{ fileKey: ObjectKey }>) => {
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
    setFileKeyToDelete: (state, action: PayloadAction<{ fileKey: UiState['fileKeyToDelete'] }>) => {
      const { fileKey } = action.payload;
      state.fileKeyToDelete = fileKey;
    },
  },
});

export const {
  openFilePreviewModal,
  closeFilePreviewModal,
  setFileKeyToDelete,
} = uiSlice.actions;

export const uiStateReducer = uiSlice.reducer;
