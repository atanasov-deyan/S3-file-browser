import React from 'react';

import { Button } from './layout/Button';
import { IFormField, loginFormFields } from '../config/loginFormFields';

import styles from './LoginForm.module.css'

export const LoginForm = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget)
    const fieldValues = Object.fromEntries(formData.entries())

    console.log(fieldValues)
  };
  // todo: abstract Form and Input into layout components
  return (
    <section className={styles['form-container']}>
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
            >
              Login
            </Button>
          </li>
        </ul>
      </form>
    </section>
  );
};
