import { FormEventHandler, useState } from 'react';

import styles from './CreateFileForm.module.css';
import { Icon } from './layout/Icon';
import { Button } from './layout/Button';
import { ErrorMessage } from './layout/ErrorMessage';
import { entityTypes } from '../config';

const isValidName= (name: string): boolean => {
  // Regular expression pattern for folder or file validation
  const pattern = /^[^/\\.\s]+$/;

  return pattern.test(name);
};

interface ICreateFileFormProps {
  handleSubmit: FormEventHandler,
  entityType: string,
  fileName?: string,
}

const errorMessage = 'The following symbols are not allowed: "/", "\\", "." and empty space';

export const CreateFileForm = ({ handleSubmit, entityType, fileName }: ICreateFileFormProps) => {
  const [value, setValue] = useState('');
  const [touched, setTouched] = useState(false);
  const showErrorMessage = touched && !isValidName(value);

  return !fileName
    ? (
      <form onSubmit={handleSubmit} className={styles['file-container']}>
        {!!entityType && (
          <>
            <Icon className={styles.icon} name={entityType === entityTypes.folder ? 'folder' : 'file-o'}/>
            <div className={styles['input-wrapper']}>
              <input
                className={styles.input}
                type='text'
                id={`${entityType}-input`}
                name={entityType}
                placeholder={`New ${entityType}`}
                pattern="^[^/\\.\s]+$"
                onChange={(event) => setValue(event.currentTarget.value)}
                onBlur={() => setTouched(true)}
                required={true}
                aria-describedby={showErrorMessage ? `${entityType}-error` : undefined}
              />

                <Button
                  type='text'
                  size='small'
                  htmlType='submit'
                  disabled={!isValidName(value)}
                >
                 Add
                </Button>
            </div>
            <ErrorMessage showError={showErrorMessage} error={{ message: errorMessage, code: entityType }}/>

            {entityType === entityTypes.file && (
              <textarea
              id={`${entityType}-content-input`}
              name='content'
              placeholder={`Enter file content...`}
              rows={5}
              required={true}
              aria-describedby={showErrorMessage ? `${entityType}-error` : undefined}
            />
            )}
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
