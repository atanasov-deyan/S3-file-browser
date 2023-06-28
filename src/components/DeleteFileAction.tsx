import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Button } from './layout/Button';
import { dispatch, useUiState } from '../store/storeFacade';
import { setFileKeyToDelete } from '../store/uiState/reducer';
import { Icon } from './layout/Icon';
import { Modal } from './layout/Modal';
import { DeleteFile } from './DeleteFile';

import styles from './DeleteFileAction.module.css';

export const DeleteFileAction = () => {
  const { pathname } = useLocation();
  const { fileKeyToDelete } = useUiState();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // if user changes current path clean up selected fileKey and close modal
    if (fileKeyToDelete) {
      dispatch(setFileKeyToDelete({ fileKey: null }));
      setIsVisible(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <>
      <Button
        type='ghost'
        size='small'
        disabled={!fileKeyToDelete}
        onClick={() => setIsVisible(true)}
        >
        <Icon name='trash-o' className={styles.icon}/>
        Delete
      </Button>
      {isVisible && fileKeyToDelete && (
        <Modal>
          <DeleteFile fileKey={fileKeyToDelete} closeModal={() => setIsVisible(false)}/>
        </Modal>
      )
      }
    </>
  );
};
