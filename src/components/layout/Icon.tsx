import { toClassName } from '../../utils/toClassName';

import styles from './Icon.module.css';

interface IIconProps {
  name: string;
}

export const Icon = ({ name }: IIconProps) => (
  <span className={toClassName([styles.icon, `icon-${name}`])}/>
);
