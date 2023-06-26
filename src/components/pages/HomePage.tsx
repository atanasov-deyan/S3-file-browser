import { useEffect } from 'react';

import { getAllFiles } from '../../store/filesState/effects';
import { Layout } from '../layout/Layout';
import { LeftSidebar } from '../LeftSidebar';
import { FileExplorer } from '../FileExplorer';
import { HomePageBreadcrumbs } from '../HomePageBreadcrumbs';

import styles from './HomePage.module.css';
import { CreateFileModal } from '../CreateFileModal';

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
          <HomePageBreadcrumbs/>

          <CreateFileModal/>
          <FileExplorer/>
        </section>
      </main>
    </Layout>

  );
};
