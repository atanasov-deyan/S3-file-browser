import { FormEvent, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Button } from './layout/Button';
import { dispatch, useUiState } from '../store/storeFacade';
import { FilesEventEnum, trackFilesEvent } from '../store/filesState/reducer';
import { setFileKeyToDelete } from '../store/uiState/reducer';
import { Icon } from './layout/Icon';
import { Modal } from './layout/Modal';

import styles from './DeleteFileAction.module.css';
import { DeleteFile } from './DeleteFile';



export const DeleteFileAction = () => {
  const { pathname } = useLocation();
  const { fileKeyToDelete } = useUiState();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // if user changes current path clean up selected fileKey and close modal
    if (fileKeyToDelete) {
      dispatch(setFileKeyToDelete({ fileKey: null }))
      setIsVisible(false);
    }
  }, [pathname])

  return (
    <>
      <Button
        type='ghost'
        size='small'
        disabled={!fileKeyToDelete}
        onClick={() => setIsVisible(true)}
        >
        <Icon name='trash-o'/>
        &nbsp;
        Delete
      </Button>
      {isVisible && fileKeyToDelete && (
        <Modal>
          <div className={styles.modal}>
            <DeleteFile fileKey={fileKeyToDelete}/>
          </div>
        </Modal>
      )
      }
    </>
  )
};
