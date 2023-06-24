import React, { useEffect } from 'react';

import { getAllFiles } from '../../store/filesState/effects';
import { Layout } from '../layout/Layout';
import { LeftSidebar } from '../LeftSidebar';

import styles from './HomePage.module.css';

export const HomePage = () => {

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getAllFiles();
  }, []);

  return (
    <Layout>
      <main className={styles.main}>
        <LeftSidebar/>
        <section>
          main content
        </section>
      </main>
    </Layout>

  );
};
