import { useNavigate } from 'react-router-dom';
import { logout } from '../store/authState/effects';
import { useAuthState } from '../store/storeFacade';
import { Button } from './layout/Button';
import { Icon } from './layout/Icon';

import styles from './LogoutAction.module.css';

export const LogoutAction = () => {
  const { isAuthorized } = useAuthState();
  const navigate = useNavigate();

  const onClick = () => {
    logout();
    navigate('/login');
  };

  return isAuthorized && (
    <Button type='text' onClick={onClick}>
      <Icon name='logout' className={styles.icon}/>
    </Button>

  );
};
