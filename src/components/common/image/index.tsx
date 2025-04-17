import styles from './index.module.scss';

import { ComponentProps, useState } from 'react';
import clsx from 'clsx';

type ImageProps = ComponentProps<'img'>;

export const Image = ({ className, ...props }: ImageProps) => {
  const [loaded, setLoaded] = useState(false);
  const { width, height, src } = props;

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
      {!src && (
        <div className="grid h-full w-full place-items-center">
          <span className="text-xs font-semibold text-slate-600">
            NO IMAGE!
          </span>
        </div>
      )}
      {!!src && (
        <img
          className={clsx(styles['image'], loaded && styles['-loaded'])}
          width={width}
          height={height}
          src={src}
          {...props}
          onLoad={() => setLoaded(true)}
        />
      )}
    </div>
  );
};
