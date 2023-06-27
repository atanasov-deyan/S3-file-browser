import { useEffect, useState } from 'react';
import { dispatch, useFilesState } from '../store/storeFacade';
import { FilesEventEnum, trackFilesEvent } from '../store/filesState/reducer';
import { getAllFiles } from '../store/filesState/effects';
import { IObject } from '../definitions/IObject';
import { GetObjectOutput, Object } from 'aws-sdk/clients/s3';
import { s3Service } from '../services/S3Service';

const syncAllFiles = async () => {
  await getAllFiles();
  dispatch(trackFilesEvent({ eventTracker: null }));
};

export const useFilesEventTracker = () => {
  const { eventTracker } = useFilesState();

  useEffect(() => {
    if (eventTracker === FilesEventEnum.SYNC_FILES) {
      syncAllFiles();
    }
  }, [eventTracker]);
};

export const useFileContent = (fileKey: IObject['Key']): [result: string, isLoading: boolean] => {
  const [result, setResult] = useState('');
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const init = async () => {
      try {
        if (isMounted) {
          setLoading(true);
        }

        const response = await s3Service.getObject(fileKey);

        const decoder = new TextDecoder();
        const bodyString = decoder.decode(response.Body as Uint8Array);

        if (isMounted) {
          setLoading(false);
          setResult(bodyString);
        }
      } catch (error) {
        setLoading(false);
      }
    };

    init();

    // cleanUp memory leaks
    return () => {
      isMounted = false;
    };
  }, [fileKey]);

  return [result, isLoading];
};
