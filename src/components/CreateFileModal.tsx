import { useCallback, useState } from 'react';

import { Button } from './layout/Button';
import { Icon } from './layout/Icon';
import { Modal } from './layout/Modal';
import { CreateFile } from './CreateFile';

import styles from './CreateFileModal.module.css';

export const CreateFileModal = () => {
  const [isVisible, setIsVisible] = useState(false);

  const closeModal = useCallback(() => setIsVisible(false), []);

  return (
  <div style={{ marginBottom: 24 }}>
    <Button type='default' size='small' onClick={() => setIsVisible(true)}>
      <Icon name='plus' className={styles.icon}/>
      &nbsp;
      Create
    </Button>
    {isVisible && (
      <Modal>
        <div className={styles['modal-content']}>
          <CreateFile onCancel={closeModal}/>
        </div>
      </Modal>
    )}
  </div>
  );
}
