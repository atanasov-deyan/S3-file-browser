import { useEffect } from 'react';

import { Layout } from '../layout/Layout';
import { LeftSidebar } from '../LeftSidebar';
import { FileExplorer } from '../FileExplorer';
import { HomePageBreadcrumbs } from '../HomePageBreadcrumbs';

import styles from './HomePage.module.css';
import { CreateFileModal } from '../CreateFileModal';
import { useFilesEventTracker } from '../../hooks.ts/fileHooks';
import { dispatch } from '../../store/storeFacade';
import { FilesEventEnum, trackFilesEvent } from '../../store/filesState/reducer';

export const HomePage = () => {
  useFilesEventTracker();

  useEffect(() => {
    dispatch(trackFilesEvent({ eventTracker: FilesEventEnum.SYNC_FILES }));
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
