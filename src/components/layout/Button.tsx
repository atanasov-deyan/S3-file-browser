import React, { ComponentProps, ReactNode, useMemo } from 'react'

import styles from './Button.module.css'
import { toClassName } from '../../utils/toClassName'

type SizeType = 'small' | 'middle' | 'large';
type ButtonHTMLType = 'submit' | 'button' | 'reset'
type ButtonType = 'default' | 'primary' | 'ghost'

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
  // todo: add loading indication, e.g. spinner
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  loading,
  ...rest
}: IButtonProps) => {
  const classNames = useMemo(() => {
    const typeClass = styles[`button-${type}`]
    const sizeClass = styles[`button-${size}`]

    return toClassName([
      styles.button,
      typeClass,
      sizeClass,
      className,
    ])
  }, [className, type, size])


  return (
    <button
      className={classNames}
      onClick={onClick}
      type={htmlType}
      {...rest}
    >
      {children}
    </button>
  )
}
