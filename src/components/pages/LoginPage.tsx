import { LoginForm } from '../LoginForm';
import { LoginHeading } from '../LoginHeading';

import styles from './LoginPage.module.css';
import { Layout } from '../layout/Layout';

export const LoginPage = () => {

  return (
    <Layout>
      <article className={styles.container}>
        <LoginHeading/>
        <LoginForm/>
      </article>
    </Layout>
  );
};
