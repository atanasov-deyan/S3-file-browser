import { FormEvent, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Button } from './layout/Button';
import { ROOT_DIR_NAME, entityTypes } from '../config';
import { createFile } from '../store/filesState/effects';
import { CreateEntityForm } from './CreateEntityForm';
import { CreateFileBreadcrumbs } from './CreateFileBreadcrumbs';
import { CreateNewEntityActions } from './CreateNewEntityActions';
import { dispatch, useLoadingState } from '../store/storeFacade';
import { FilesEventEnum, trackFilesEvent } from '../store/filesState/reducer';

import styles from './CreateFile.module.css';

interface ICreateFile {
  onCancel: VoidFunction;
}

export const CreateFile = ({ onCancel }: ICreateFile) => {
  const isLoading = useLoadingState('files/createFile');
  const { pathname } = useLocation();

  const [newFile, setNewFile] = useState({ path: '', content: '' });
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
    const { content } = newFile;
    const fileKey = pathname === ROOT_DIR_NAME
      ? newFile.path.slice(1)
      : `${pathname.slice(1)}${newFile.path}`;

     const onSuccessCreation = () => {
      onCancel();
      dispatch(trackFilesEvent({ eventTracker: FilesEventEnum.SYNC_FILES }));
     };

    createFile(fileKey, content, onSuccessCreation);
  };
  const setCurrentPath = (path: string) => setNewFile({ ...newFile, path });
  return (
    <div className={styles.content}>
      <CreateFileBreadcrumbs
        currentPath={newFile.path}
        setCurrentPath={setCurrentPath}
      />

      <CreateNewEntityActions isDisabled={!!fileName} setNewEntity={setNewEntity}/>

      <CreateEntityForm
        handleSubmit={onFormSubmit}
        entityType={newEntity}
        fileName={fileName}
      />

      <div className={styles['modal-actions']}>
        <Button
          type='primary'
          size='small'
          disabled={!fileName || isLoading}
          loading={isLoading}
          onClick={onCreateNewFile}
        >
          Create
        </Button>
        &nbsp;
        <Button type='default' size='small' onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
};
