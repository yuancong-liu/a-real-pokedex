import styles from './index.module.scss';

import { ComponentProps, useState } from 'react';
import clsx from 'clsx';

type ImageProps = ComponentProps<'img'>;

export const Image = ({ className, ...props }: ImageProps) => {
  const [loaded, setLoaded] = useState(false);
  const { width, height } = props;

  return (
    <div
      className={clsx(styles['image-container'], className)}
      style={
        width && height
          ? {
              width: `${width}px`,
              height: `${height}px`,
            }
          : {}
      }
    >
      <img
        className={clsx(styles['image'], loaded && styles['-loaded'])}
        width={width}
        height={height}
        {...props}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
};
