import React from 'react';

import styles from './LoginForm.module.css'
import { Button } from './layout/Button';

export const LoginForm = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log(event.currentTarget.elements)
    return
    const accessKeyId = event.currentTarget.elements.accessKeyId.value;
    const secretAccessKey = event.currentTarget.elements.secretAccessKey.value;
    const bucketName = event.currentTarget.elements.bucketName.value;

  };
  // todo: abstract Label and Input
  return (
    <section className={styles['form-container']}>
      <form onSubmit={handleSubmit}>
        <ul className={styles['items-list']}>
          <li className={styles.item}>
            <label className={styles.label} htmlFor="accessKeyId">Access Key ID:</label>
            <input className={styles.input} type="text" id="accessKeyId" required placeholder='Enter access key id...'/>
          </li>
          <li className={styles.item}>
            <label className={styles.label} htmlFor="secretAccessKey">Secret Access Key:</label>
            <input className={styles.input} type="password" id="secretAccessKey" required placeholder='Enter secret access key...'/>
          </li>
          <li className={styles.item}>
            <label className={styles.label} htmlFor="bucketName">Bucket Name:</label>
            <input className={styles.input} type="text" id="bucketName" required placeholder='Enter bucket name...'/>
          </li>
          <li className={styles.item}>
            <Button
              htmlType="submit"
              type='primary'
              size='large'
            >
              Login
            </Button>
          </li>
        </ul>
      </form>
    </section>
  );
};
