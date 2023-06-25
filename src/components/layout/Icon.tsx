import { toClassName } from '../../utils/toClassName';

import styles from './Icon.module.css';

interface IIconProps {
  name: string;
  className?: string,
}

export const Icon = ({ className, name }: IIconProps) => (
  <span className={toClassName([styles.icon, className, `icon-${name}`])}/>
);
