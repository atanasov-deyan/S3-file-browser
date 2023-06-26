import { PropsWithChildren, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthState, useNetworkState } from '../../store/storeFacade';
import { validateStoredAuthentication } from '../../store/authState/effects';

export const GuardUnauthorized = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();
  const { isAuthorized } = useAuthState();
  const { errors } = useNetworkState();

  const unauthorizedErrors = Object.values(errors)
    .filter(error => error?.statusCode === 401 || error?.statusCode === 403);

  useEffect(() => {
    // todo: move in a separate hook/Guard
    // simple check to see if we have credentials to try and authenticate with
    const areCredentialsStored = localStorage.getItem('accessKeyId');

    if (!isAuthorized && areCredentialsStored) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      validateStoredAuthentication(navigate);
      return;
    }

    if (!isAuthorized || !!unauthorizedErrors.length) {
      navigate('/login');
    }
  }, [isAuthorized, navigate, unauthorizedErrors]);

  return isAuthorized && children;
};
