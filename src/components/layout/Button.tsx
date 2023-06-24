import React, { ComponentProps, ReactNode, useMemo } from 'react';

import styles from './Button.module.css';
import { toClassName } from '../../utils/toClassName';
import { Spin } from './Spin';

type SizeType = 'small' | 'middle' | 'large';
type ButtonHTMLType = 'submit' | 'button' | 'reset'
type ButtonType = 'default' | 'primary' | 'ghost' | 'text'

export interface IButtonProps extends Omit<ComponentProps<'button'>, 'type'> {
  onClick?: React.MouseEventHandler;
  size?: SizeType;
  type?: ButtonType;
  htmlType: ButtonHTMLType,
  children: ReactNode,
  loading?: boolean,
}

export const Button = ({
  className,
  children,
  htmlType = 'button',
  onClick,
  size = 'middle',
  type = 'default',
  loading,
  ...rest
}: IButtonProps) => {
  const classNames = useMemo(() => {
    const typeClass = styles[`button-${type}`];
    const sizeClass = styles[`button-${size}`];

    return toClassName([
      styles.button,
      typeClass,
      sizeClass,
      className,
    ]);
  }, [className, type, size]);


  return (
    <button
      className={classNames}
      onClick={onClick}
      type={htmlType}
      {...rest}
    >
      <Spin spin={loading} size={32}/>
      {children}
    </button>
  );
};
