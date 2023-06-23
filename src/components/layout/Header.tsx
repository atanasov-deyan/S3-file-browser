import React from 'react';

import s3Logo from '../../../public/images/logo.svg';
import styles from './Header.module.css';

export const Header = () => (
  <header className={styles.header}>
    {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
    <img src={s3Logo} height={42} alt='S3 logo'/>
  </header>
);
