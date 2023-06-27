import { useEffect } from 'react';

import { Layout } from '../layout/Layout';
import { LeftSidebar } from '../LeftSidebar';
import { FileExplorer } from '../FileExplorer';
import { HomePageBreadcrumbs } from '../HomePageBreadcrumbs';
import { CreateFileModal } from '../CreateFileModal';
import { useFilesEventTracker } from '../../hooks/fileHooks';
import { dispatch } from '../../store/storeFacade';
import { FilesEventEnum, trackFilesEvent } from '../../store/filesState/reducer';
import { FilePreviewModal } from '../FilePreviewModal';
import { DeleteFileAction } from '../DeleteFileAction';

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

          <div style={{ display: 'flex', width: 200, justifyContent: 'space-evenly' }}>
            <CreateFileModal/>

            <DeleteFileAction/>
          </div>
          <FileExplorer/>

          <FilePreviewModal/>
        </section>
      </main>
    </Layout>

  );
};
