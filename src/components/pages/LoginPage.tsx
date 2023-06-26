import { LoginForm } from '../LoginForm';
import { LoginHeading } from '../LoginHeading';
import { Layout } from '../layout/Layout';

import styles from './LoginPage.module.css';

export const LoginPage = () => {

  return (
    <Layout>
      <section className={styles.container}>
        <LoginHeading/>
        <LoginForm/>
      </section>
    </Layout>
  );
};
