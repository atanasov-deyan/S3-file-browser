import { useEffect } from 'react';
import { dispatch, useFilesState } from '../store/storeFacade';
import { FilesEventEnum, trackFilesEvent } from '../store/filesState/reducer';
import { getAllFiles } from '../store/filesState/effects';

const syncAllFiles = async () => {
  await getAllFiles();
  dispatch(trackFilesEvent({ eventTracker: null }));
};

export const useFilesEventTracker = () => {
  const { eventTracker } = useFilesState();

  useEffect(() => {
    if (eventTracker === FilesEventEnum.SYNC_FILES) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      syncAllFiles();
    }
  }, [eventTracker]);
}
