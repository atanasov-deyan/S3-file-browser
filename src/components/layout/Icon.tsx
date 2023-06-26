import { CSSProperties, ComponentProps } from 'react';
import { toClassName } from '../../utils/toClassName';

import styles from './Icon.module.css';

interface IIconProps {
  name: string;
  className?: string;
  style?: CSSProperties;
}

export const Icon = ({ className, name, style }: IIconProps) => (
  <span className={toClassName([styles.icon, className, `icon-${name}`])} style={style}/>
);
