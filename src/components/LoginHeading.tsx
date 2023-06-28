import styles from './LoginHeading.module.css';

export const LoginHeading = () => (
  <>
    <h1 className={styles.heading}>Welcome to AWS S3 Bucket Explorer</h1>
    <p>Please enter your credentials to proceed</p>
  </>
);
