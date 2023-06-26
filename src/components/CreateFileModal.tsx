import { FormEvent, useCallback, useState } from 'react';
import { useLocation } from 'react-router-dom';


import { Modal } from './layout/Modal';
import { Button } from './layout/Button';
import { Icon } from './layout/Icon';
import { entityTypes } from '../config';
import { createFile } from '../store/filesState/effects';

import styles from './CreateFileModal.module.css';
import { CreateFileForm } from './CreateFileForm';

interface ICreateFileModal {
  isVisible: boolean;
  closeModal: VoidFunction;
}

export const CreateFileModal = ({ isVisible, closeModal } : ICreateFileModal) => {
  const { pathname } = useLocation();
  // file names do not start with a slash
  const [currentPath, setCurrentPath] = useState(pathname.slice(1));
  const [newEntity, setNewEntity] = useState('');

  const addFolder = () => setNewEntity(entityTypes.folder);
  const addFile = () => setNewEntity(entityTypes.file);

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const fieldValues = Object.fromEntries(formData.entries());

    const {
      [newEntity]: value,
    } = fieldValues;

    if (typeof value !== 'string') {
      return;
    }

    if (newEntity === entityTypes.folder) {
      setCurrentPath(`${currentPath}/${value.trim()}`);
    }

    if (newEntity === entityTypes.file) {
      setCurrentPath(`${currentPath}/${value.trim()}.txt`);
    }

    setNewEntity('');
  };

  const fileName = currentPath.endsWith('.txt') ? currentPath.split('/').at(-1) : undefined;

  const createNewFile = useCallback((): void => {
    const fileKey = currentPath.startsWith('/')
     ? currentPath.slice(1)
     : currentPath;
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    createFile(fileKey, '', closeModal);
  }, [closeModal, currentPath]);

  return isVisible && (
      <Modal>
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles['actions-container']}>
              <Button type='text' disabled={!!fileName} onClick={addFolder}>New folder</Button>
              &nbsp;
              <Button type='text' disabled={!!fileName} onClick={addFile}>New file</Button>
            </div>

              <CreateFileForm
                handleSubmit={handleSubmit}
                entityType={newEntity}
                fileName={fileName}
              />

            <div className={styles['modal-actions']}>
              <Button type='primary' size='small' disabled={!fileName} onClick={createNewFile}>
                Create
              </Button>
              &nbsp;
              <Button type='default' size='small' onClick={closeModal}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </Modal>
  );
};
