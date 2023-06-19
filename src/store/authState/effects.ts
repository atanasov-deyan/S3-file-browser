import { s3Service } from '../../services/S3Service';
import { dispatch } from '../storeFacade';
import { authFailure, authRequest, authSuccess } from './reducer';


type CredentialsType = {
  accessKeyId: string;
  secretAccessKey: string;
  bucketName: string;
}
export const authenticate = async (credentials: CredentialsType): Promise<void> => {
  const { accessKeyId, secretAccessKey, bucketName } = credentials
  dispatch(authRequest())

  try {
    await s3Service.configureS3(accessKeyId, secretAccessKey, bucketName)
    dispatch(authSuccess())
  } catch (error) {
    dispatch(authFailure(error))
  }
};
