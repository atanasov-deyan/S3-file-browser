import { useNavigate } from 'react-router-dom';

import { Button } from './layout/Button';
import { loginFormFields } from '../config';
import { authenticate } from '../store/authState/effects';
import { useErrorState, useLoadingState } from '../store/storeFacade';
import { IFormField } from '../definitions/FormField';

import styles from './LoginForm.module.css';
import { ErrorMessage } from './layout/ErrorMessage';

export const LoginForm = () => {
  const isLoading = useLoadingState('auth/auth');
  const authError = useErrorState('auth/auth');
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const fieldValues = Object.fromEntries(formData.entries());
    const { accessKeyId, secretAccessKey, bucketName } = fieldValues;

    // look into smarter ways of handling this
    if (typeof accessKeyId !== 'string' || typeof secretAccessKey !== 'string' || typeof bucketName !== 'string') {
      return;
    }
    await authenticate({ accessKeyId, secretAccessKey, bucketName }, navigate);
  };

  // todo: abstract Form and Input into layout components
  return (
    <section className={styles['form-container']}>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form onSubmit={handleSubmit}>
        <ul className={styles['items-list']}>
          {loginFormFields.map((field: IFormField) => (
            <li className={styles.item} key={field.name}>
              <label
                className={styles.label}
                htmlFor={`${field.name}-field`}>
                  {field.label}:
              </label>

              <input
                className={styles.input}
                type={field.type}
                id={`${field.name}-field`}
                name={field.name}
                required={field.required}
                placeholder={field.placeholder}
              />
          </li>
          ))}

          <li className={styles.item}>
            <Button
              htmlType="submit"
              type='primary'
              size='large'
              disabled={isLoading}
            >
              Login
            </Button>
          </li>
          <li className={styles.item}>
            <ErrorMessage
              showError={!!authError && !isLoading}
              error={authError}
            />
          </li>
        </ul>
      </form>
    </section>
  );
};
