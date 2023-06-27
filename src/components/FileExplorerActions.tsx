import { CreateFileAction } from './CreateFileAction';
import { DeleteFileAction } from './DeleteFileAction';

import styles from './FileExplorerActions.module.css';

export const FileExplorerActions = () => (
  <div className={styles['actions-container']}>
    <CreateFileAction/>

    <DeleteFileAction/>
  </div>
);
