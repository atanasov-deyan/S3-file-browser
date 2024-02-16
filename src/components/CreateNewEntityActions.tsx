import { Button } from './layout/Button';

import { entityTypes } from '../config';

import styles from './CreateFileEntityActions.module.css';

type Props = {
  setNewEntity: (v: string) => void;
  isDisabled: boolean;
}

export const CreateNewEntityActions = ({ setNewEntity, isDisabled }: Props) => {
  const addFolder = () => setNewEntity(entityTypes.folder);
  const addFile = () => setNewEntity(entityTypes.file);

  return (
    <div className={styles.actions}>
      <Button
        type='text'
        disabled={isDisabled}
        onClick={addFolder}
        >
          New folder
        </Button>
      &nbsp;
      <Button
        type='text'
        disabled={isDisabled}
        onClick={addFile}
        >
          New file
        </Button>
    </div>
  );
};
