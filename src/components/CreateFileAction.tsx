import { useCallback, useState } from 'react';

import { Button } from './layout/Button';
import { Icon } from './layout/Icon';
import { Modal } from './layout/Modal';
import { CreateFile } from './CreateFile';

import styles from './CreateFileAction.module.css';

export const CreateFileAction = () => {
  const [isVisible, setIsVisible] = useState(false);

  const closeModal = useCallback(() => setIsVisible(false), []);

  return (
  <>
    <Button type='default' size='small' onClick={() => setIsVisible(true)}>
      <Icon name='plus' className={styles.icon}/>
      Create
    </Button>
    {isVisible && (
      <Modal>
        <CreateFile onCancel={closeModal}/>
      </Modal>
    )}
  </>
  );
}
