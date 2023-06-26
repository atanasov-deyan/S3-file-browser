import { FormEvent, useCallback, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Button } from './layout/Button';
import { entityTypes } from '../config';
import { createFile } from '../store/filesState/effects';

import styles from './CreateFileModal.module.css';
import { CreateFileForm } from './CreateFileForm';
import { CreateFileBreadcrumbs } from './CreateFileBreadcrumbs';
import { CreateNewEntityActions } from './CreateNewEntityActions';

interface ICreateFile {
  onCancel: VoidFunction,
}

export const CreateFile = ({ onCancel }: ICreateFile) => {
  const { pathname } = useLocation();
  // file names do not start with a slash
  const path = pathname.slice(1);
  const [currentPath, setCurrentPath] = useState(path);
  const [newEntity, setNewEntity] = useState('');

  const onFormSubmit = (event: FormEvent<HTMLFormElement>): void => {
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

  const onCreateNewFile = (): void => {
    const fileKey = currentPath.startsWith('/')
     ? currentPath.slice(1)
     : currentPath;
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    createFile(fileKey, '', onCancel);
  };

  return (
        <div className={styles.container}>
          <div className={styles.content}>
            <CreateFileBreadcrumbs
              pathname={path}
              currentPath={currentPath}
              setCurrentPath={setCurrentPath}
            />

            <CreateNewEntityActions isDisabled={!!fileName} setNewEntity={setNewEntity}/>

            <CreateFileForm
              handleSubmit={onFormSubmit}
              entityType={newEntity}
              fileName={fileName}
            />

            <div className={styles['modal-actions']}>
              <Button type='primary' size='small' disabled={!fileName} onClick={onCreateNewFile}>
                Create
              </Button>
              &nbsp;
              <Button type='default' size='small' onClick={onCancel}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
  );
};
