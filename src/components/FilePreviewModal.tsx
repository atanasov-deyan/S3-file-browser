import { dispatch, useUiState } from '../store/storeFacade';
import { FilePreview } from './FilePreview';
import { Modal } from './layout/Modal';

export const FilePreviewModal = () => {
  const { filePreviewModal: { isVisible, fileKey} } = useUiState();

  return (isVisible && fileKey) && (
    <Modal>
      <FilePreview fileKey={fileKey}/>
    </Modal>
  );
};
