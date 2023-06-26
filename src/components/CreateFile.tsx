import { useCallback, useState } from 'react';

import { Button } from './layout/Button';
import { Icon } from './layout/Icon';
import { CreateFileModal } from './CreateFileModal';

import styles from './CreateFile.module.css';

export const CreateFile = () => {
  const [isVisible, setIsVisible] = useState(false);

  const closeModal = useCallback(() => setIsVisible(false), []);

  return (
  <div style={{ marginBottom: 24 }}>
    <Button type='default' size='small' onClick={() => setIsVisible(true)}>
      <Icon name='plus' className={styles.icon}/>
      &nbsp;
      Create
    </Button>
    <CreateFileModal isVisible={isVisible} closeModal={closeModal}/>
  </div>
  );
}
