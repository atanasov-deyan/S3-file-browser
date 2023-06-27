import { useEffect } from "react"
import { dispatch, useFilesState } from "../store/storeFacade"
import { Button } from "./layout/Button";
import { setFileKeyToDelete } from "../store/uiState/reducer";

import styles from './DeleteFile.module.css';

export const DeleteFile = ({ fileKey }: { fileKey: string }) => {
  const { allObjects } = useFilesState();

  const onDelete = () => {
    console.log({ fileKey, allObjects });
  };

  const onCancel = () => {
    dispatch(setFileKeyToDelete({ fileKey: null }))
  };

  return (
    <article className={styles.container}>
      <h1>Are you sure?</h1>

      <p>Delete is an irreversible operation. Please note that any subfolders and content will also be removed</p>

      <div className={styles.actions}>
        <Button type='primary' onClick={onDelete}>
          Delete
        </Button>

        <Button onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </article>
  )
}
