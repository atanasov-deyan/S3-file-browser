import { AWSError } from 'aws-sdk';
import { NavigateFunction } from 'react-router-dom';

import { AWSCredentials } from '../../definitions/AWSCredentials';
import { s3Service } from '../../services/S3Service';
import { dispatch } from '../storeFacade';
import { authFailure, authRequest, authSuccess } from './reducer';
import { parseError } from '../../utils/parseError';


export const authenticate = async (credentials: AWSCredentials, navigate: NavigateFunction): Promise<void> => {
  dispatch(authRequest());

  try {
    await s3Service.configureS3(credentials);
    dispatch(authSuccess());
    navigate('/');
  } catch (e) {
    dispatch(authFailure(parseError(e as AWSError)));
    navigate('/login');
  }
};
