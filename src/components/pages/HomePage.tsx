import React from 'react';

import { Layout } from '../layout/Layout';
import { Sidebar } from '../layout/Sidebar';

import styles from './HomePage.module.css';

export const HomePage = () => {

  return (
    <Layout>
      <main className={styles.main}>
        <Sidebar>
          sidebar content
        </Sidebar>
        <section>
          main content
        </section>
      </main>
    </Layout>

  );
};
