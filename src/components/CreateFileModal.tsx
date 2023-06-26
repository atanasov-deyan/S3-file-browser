import { useCallback, useState } from 'react';

import { Button } from './layout/Button';
import { Icon } from './layout/Icon';
import { CreateFile } from './CreateFile';

import styles from './CreateFile.module.css';
import { Modal } from './layout/Modal';

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
        <CreateFile onCancel={closeModal}/>
      </Modal>
    )}
  </div>
  );
}
