import { FormEvent, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Button } from './layout/Button';
import { entityTypes } from '../config';
import { createFile } from '../store/filesState/effects';
import { CreateFileForm } from './CreateFileForm';
import { CreateFileBreadcrumbs } from './CreateFileBreadcrumbs';
import { CreateNewEntityActions } from './CreateNewEntityActions';

import styles from './CreateFile.module.css';

interface ICreateFile {
  onCancel: VoidFunction,
}

export const CreateFile = ({ onCancel }: ICreateFile) => {
  const { pathname } = useLocation();
  // file names do not start with a slash
  const path = pathname.slice(1);
  const [newFile, setNewFile] = useState({ path, content: '' });
  const [newEntity, setNewEntity] = useState('');

  const onFormSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const fieldValues = Object.fromEntries(formData.entries());

    const {
      [newEntity]: value,
      content,
    } = fieldValues;

    if (typeof value !== 'string') {
      return;
    }

    if (newEntity === entityTypes.folder) {
      setNewFile({
        ...newFile,
        path: `${newFile.path}/${value.trim()}`,
      });
    }

    if (newEntity === entityTypes.file && typeof content === 'string') {
      setNewFile(
        {
          ...newFile,
          path: `${newFile.path}/${value.trim()}.txt`,
          content,
        },
      );
    }

    setNewEntity('');
  };

  const fileName = newFile.path.endsWith('.txt') ? newFile.path.split('/').at(-1) : undefined;

  const onCreateNewFile = (): void => {
    const fileKey = newFile.path.startsWith('/')
     ? newFile.path.slice(1)
     : newFile.path;
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    createFile(fileKey, '', onCancel);
  };
  const setCurrentPath = (path: string) => setNewFile({ ...newFile, path });
  return (
        <div className={styles.container}>
          <div className={styles.content}>
            <CreateFileBreadcrumbs
              pathname={path}
              currentPath={newFile.path}
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
