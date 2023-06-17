import React, { ReactElement, useMemo } from 'react'

import styles from './Button.module.css'
import { toClassName } from '../../utils/toClassName'

declare type SizeType = 'small' | 'middle' | 'large';
declare type ButtonHTMLType = 'submit' | 'button' | 'reset'
declare type ButtonType = 'default' | 'primary' | 'ghost'
// todo: add proper typing
interface IButtonProps {
  onClick?: React.MouseEventHandler;
  size?: SizeType;
  type?: ButtonType;
  htmlType:  ButtonHTMLType,
  children: ReactElement | string,
  className?: string | undefined,
}

export const Button = ({
  className,
  children,
  htmlType = 'button',
  onClick,
  size = 'middle',
  type = 'default',
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
    >
      {children}
    </button>
  )
}
