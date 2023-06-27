import { IObject } from '../definitions/IObject';
import { useFileContent } from '../hooks.ts/fileHooks';
import { dispatch } from '../store/storeFacade';
import { closeFilePreviewModal } from '../store/uiState/reducer';
import { Spin } from './layout/Spin';
import { Button } from './layout/Button';

import styles from './FilePreview.module.css';

interface IFilePreviewProps {
  fileKey: IObject['Key'];
}

const closeModal = () => {
  dispatch(closeFilePreviewModal());
};

export const FilePreview = ({ fileKey }: IFilePreviewProps) => {
  const [fileContent, isLoading] = useFileContent(fileKey);

  if (isLoading) {
    return (
      <div>
        <Spin spin={isLoading}/>
      </div>
    );
  }

  const fileName = fileKey.split('/').at(-1);

  return (
    <article className={styles['file-content']}>
      <Button
          type='primary'
          size='small'
          onClick={closeModal}
          className={styles.close}
        >
          Close
        </Button>
      <h1>File name: {fileName}</h1>

      <h4>Content:</h4>
      <p>{fileContent}</p>
    </article>
  );
};
