import { PropsWithChildren, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthState, useNetworkState } from '../../store/storeFacade';

export const GuardUnauthorized = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();
  const { isAuthorized } = useAuthState();
  const { errors } = useNetworkState();

  const unauthorizedErrors = Object.values(errors)
    .filter(error => error?.statusCode === 401 || error?.statusCode === 403)

  useEffect(() => {
    if (!isAuthorized || !!unauthorizedErrors.length) {
      navigate('/login');
    }
  }, [isAuthorized, navigate, unauthorizedErrors]);

  return isAuthorized && children;
};
