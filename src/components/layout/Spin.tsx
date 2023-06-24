import spinner from '../../../public/images/spinner.svg';

interface ISpinProps {
  spin?: boolean;
  size?: number;
}

export const Spin =({ spin, size = 64 }: ISpinProps) => spin && (
  <img
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    src={spinner}
    alt="loading-indication"
    height={size}
    width={size}
  />
);
