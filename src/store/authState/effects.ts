import { AWSError } from 'aws-sdk';
import { NavigateFunction } from 'react-router-dom';

import { AWSCredentials } from '../../definitions/AWSCredentials';
import { s3Service } from '../../services/S3Service';
import { dispatch } from '../storeFacade';
import { authFailure, authRequest, authSuccess, signOut } from './reducer';
import { parseError } from '../../utils/parseError';
import { decryptString, encryptString } from '../../utils/encryption';


const storeCredentials = async (credentials: AWSCredentials): Promise<void> => {
  try {
    const accessKeyId = await encryptString(credentials.accessKeyId);
    const secretAccessKey = await encryptString(credentials.secretAccessKey);
    const bucketName = await encryptString(credentials.bucketName);

    localStorage.setItem('accessKeyId', accessKeyId);
    localStorage.setItem('secretAccessKey', secretAccessKey);
    localStorage.setItem('bucketName', bucketName);
  } catch (error) {
    console.warn('Something went wrong when trying to securely store your credentials');
  }
};

const forgetCredentials = () => {
  localStorage.removeItem('accessKeyId');
  localStorage.removeItem('secretAccessKey');
  localStorage.removeItem('bucketName');
};

const getStoredCredentials = async (): Promise<AWSCredentials|undefined> => {

  try {
    const storedAccessKeyId = localStorage.getItem('accessKeyId');
    const storedSecretAccessKey = localStorage.getItem('secretAccessKey');
    const storedBucketName = localStorage.getItem('bucketName');
    const accessKeyId = await decryptString(storedAccessKeyId);
    const secretAccessKey = await decryptString(storedSecretAccessKey);
    const bucketName = await decryptString(storedBucketName);

    return {
      accessKeyId,
      secretAccessKey,
      bucketName,
    };
  } catch (error) {
    console.warn('Something went wrong when trying to securely store your credentials');
  }
};

export const validateStoredAuthentication = async (navigate: NavigateFunction, successRedirectPath?: string): Promise<void> => {
  const credentials = await getStoredCredentials();
  if (credentials) {
    await authenticate(credentials, navigate, successRedirectPath);
  }
};

export const authenticate = async (credentials: AWSCredentials, navigate: NavigateFunction, successRedirectPath?: string): Promise<void> => {
  dispatch(authRequest());

  try {
    await s3Service.configureS3(credentials);
    await storeCredentials(credentials);
    dispatch(authSuccess());

    if (successRedirectPath) {
      navigate(successRedirectPath);
    }
  } catch (e) {
    dispatch(authFailure(parseError(e as AWSError)));
    navigate('/login');
  }
};

export const logout = () => {
  forgetCredentials();
  dispatch(signOut());
}
