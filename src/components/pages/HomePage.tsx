import { useEffect } from 'react';

import { Layout } from '../layout/Layout';
import { LeftSidebar } from '../LeftSidebar';
import { FileExplorer } from '../FileExplorer';
import { HomePageBreadcrumbs } from '../HomePageBreadcrumbs';
import { FileExplorerActions } from '../FileExplorerActions';
import { useFilesEventTracker } from '../../hooks/fileHooks';
import { dispatch } from '../../store/storeFacade';
import { FilesEventEnum, trackFilesEvent } from '../../store/filesState/reducer';
import { FilePreviewModal } from '../FilePreviewModal';

import styles from './HomePage.module.css';

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

          <FileExplorerActions/>

          <FileExplorer/>

          <FilePreviewModal/>
        </section>
      </main>
    </Layout>

  );
};
