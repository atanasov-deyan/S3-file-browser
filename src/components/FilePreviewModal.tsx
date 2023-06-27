import { dispatch, useUiState } from '../store/storeFacade';
import { FilePreview } from './FilePreview';
import { Modal } from './layout/Modal';

import styles from './FilePreviewModal.module.css';

export const FilePreviewModal = () => {
  const { filePreviewModal: { isVisible, fileKey} } = useUiState();

  return (isVisible && fileKey) && (
    <Modal>
      <div className={styles['modal-content']}>
        <FilePreview fileKey={fileKey}/>
      </div>
    </Modal>
  );
};
