import { useLocation } from 'react-router-dom';

import { Breadcrumbs } from './layout/Breadcrumbs';

export const HomePageBreadcrumbs = () => {
  const { pathname } = useLocation();

  return <Breadcrumbs pathname={pathname}/>;
};
