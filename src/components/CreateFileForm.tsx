import { FormEventHandler } from 'react';

import styles from './CreateFileForm.module.css';
import { Icon } from './layout/Icon';
import { Button } from './layout/Button';

const isValidName= (key: string): boolean => {
  // Regular expression pattern for folder or file validation
  const pattern = /^[^/\\\\.]+$/;

  return pattern.test(key);
};

interface ICreateFileFormProps {
  handleSubmit: FormEventHandler,
  entityType: string,
  fileName?: string,
}

export const CreateFileForm = ({ handleSubmit, entityType, fileName }: ICreateFileFormProps) => {

  return !fileName
    ? (
      <form onSubmit={handleSubmit} className={styles['file-container']}>
        {!!entityType && (
          <>
            <Icon className={styles.icon} name={entityType === 'folder' ? 'folder' : 'file-o'}/>
            <div className={styles['input-wrapper']}>
              <input
                className={styles.input}
                type='text'
                id={`${entityType}-input`}
                name={entityType}
                placeholder={`New ${entityType}`}
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
    )
    : (
      <div className={styles['file-container']}>
        <Icon className={styles.icon} name={'file-o'}/>
        {fileName}
      </div>
    );
};
