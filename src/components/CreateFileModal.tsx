import { useCallback, useState } from 'react';
import { useLocation } from 'react-router-dom';


import { Modal } from './layout/Modal';
import { Button } from './layout/Button';
import { Icon } from './layout/Icon';
import { entityTypes } from '../config';
import { createFile } from '../store/filesState/effects';

import styles from './CreateFileModal.module.css';

interface ICreateFileModal {
  isVisible: boolean;
  closeModal: VoidFunction;
}

const isValidName= (key: string): boolean => {
  // Regular expression pattern for folder or file validation
  const pattern = /^[^/\\\\.]+$/;

  return pattern.test(key);
};

export const CreateFileModal = ({ isVisible, closeModal } : ICreateFileModal) => {
  const { pathname } = useLocation();
  // file names do not start with a slash
  const [currentPath, setCurrentPath] = useState(pathname.slice(1));
  const [newEntity, setNewEntity] = useState('');

  const addFolder = () => setNewEntity(entityTypes.folder);
  const addFile = () => setNewEntity(entityTypes.file);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
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

  const isFileDeclared = currentPath.endsWith('.txt');

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
              <Button type='text' disabled={isFileDeclared} onClick={addFolder}>New folder</Button>
              &nbsp;
              <Button type='text' disabled={isFileDeclared} onClick={addFile}>New file</Button>
            </div>
            {!isFileDeclared &&
              <form onSubmit={handleSubmit} className={styles['file-container']}>
                {!!newEntity && (
                  <>
                    <Icon className={styles.icon} name={newEntity === 'folder' ? 'folder' : 'file-o'}/>
                    <div className={styles['input-wrapper']}>
                      <input
                        className={styles.input}
                        type='text'
                        id={`${newEntity}-input`}
                        name={newEntity}
                        placeholder={`New ${newEntity}`}
                        required={true}
                      />
                      <span>
                        <Button type='text' size='small' htmlType='submit'>
                          Add
                        </Button>
                      </span>
                    </div>
                  </>
                )}
              </form>
            }
            {isFileDeclared && (
              <div className={styles['file-container']}>
                <Icon className={styles.icon} name={newEntity === 'folder' ? 'folder' : 'file-o'}/>
                {currentPath.split('/').at(-1)}
              </div>
            )}
            <div className={styles['modal-actions']}>
              <Button type='primary' size='small' disabled={!isFileDeclared} onClick={createNewFile}>
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
