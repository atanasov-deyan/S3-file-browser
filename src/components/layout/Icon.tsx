import { CSSProperties } from 'react';
import { toClassName } from '../../utils/toClassName';

import styles from './Icon.module.css';

interface IIconProps {
  name: string;
  className?: string;
  style?: CSSProperties;
  title?: string;
}

export const Icon = ({ className, name, title, style }: IIconProps) => (
  <span
    className={toClassName([styles.icon, className, `icon-${name}`])}
    style={style}
    title={title}
  />
);
