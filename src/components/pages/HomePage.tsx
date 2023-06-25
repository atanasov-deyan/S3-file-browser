import { useEffect } from 'react';

import { getAllFiles } from '../../store/filesState/effects';
import { Layout } from '../layout/Layout';
import { LeftSidebar } from '../LeftSidebar';

import styles from './HomePage.module.css';
import { FileExplorer } from '../FileExplorer';

export const HomePage = () => {

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getAllFiles();
  }, []);

  return (
    <Layout>
      <main className={styles.main}>
        <LeftSidebar/>

        <section className={styles.content}>
          <FileExplorer/>
        </section>
      </main>
    </Layout>

  );
};
