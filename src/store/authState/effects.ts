import { NavigateFunction } from 'react-router-dom';

import { AWSCredentials } from '../../definitions/AWSCredentials';
import { s3Service } from '../../services/S3Service';
import { dispatch } from '../storeFacade';
import { authFailure, authRequest, authSuccess } from './reducer';


export const authenticate = async (credentials: AWSCredentials, navigate: NavigateFunction): Promise<void> => {
  dispatch(authRequest());

  try {
    await s3Service.configureS3(credentials);
    dispatch(authSuccess());
    navigate('/');
  } catch (e) {
    const error: unknown = JSON.parse(JSON.stringify(await e));

    dispatch(authFailure(error));
    navigate('/login');
  }
};
