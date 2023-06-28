import { useEffect } from 'react';
import { LoginForm } from '../LoginForm';
import { LoginHeading } from '../LoginHeading';
import { Layout } from '../layout/Layout';

import styles from './LoginPage.module.css';
import { useNavigate } from 'react-router-dom';
import { validateStoredAuthentication } from '../../store/authState/effects';

export const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    validateStoredAuthentication(navigate, '/');
  }, []);

  return (
    <Layout>
      <section className={styles.container}>
        <LoginHeading/>
        <LoginForm/>
      </section>
    </Layout>
  );
};
