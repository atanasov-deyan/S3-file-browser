import { dispatch, useFilesState, useLoadingState } from '../store/storeFacade';
import { Button } from './layout/Button';
import { setFileKeyToDelete } from '../store/uiState/reducer';
import { FilesEventEnum, trackFilesEvent } from '../store/filesState/reducer';
import { deleteFile } from '../store/filesState/effects';
import { Spin } from './layout/Spin';

import styles from './DeleteFile.module.css';

type Props = {
  fileKey: string;
  closeModal: VoidFunction;
}

export const DeleteFile = ({ fileKey, closeModal }: Props) => {
  const { allObjects } = useFilesState();
  const isLoading = useLoadingState('files/deleteFile');

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', width: `100vw`}}>
        <div>
          <Spin spin/>
        </div>
      </div>
    );
  }

  const onCancel = () => {
    closeModal();
    dispatch(setFileKeyToDelete({ fileKey: null }));
  };

  const onDelete = () => {
    const onSuccessDelete = () => {
      dispatch(trackFilesEvent({ eventTracker: FilesEventEnum.SYNC_FILES }));
      onCancel();
     };

     deleteFile(fileKey, allObjects, onSuccessDelete);
  };

  return (
    <article className={styles.container}>
      <h1>Are you sure?</h1>
      {/* add proper messages for files and dirs */}
      <p>Note that any subfolders and content will also be removed</p>

      <div className={styles.actions}>
        <Button type='primary' onClick={onDelete}>
          Delete
        </Button>

        <Button onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </article>
  );
};
