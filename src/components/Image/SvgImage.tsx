import React, { FC, useCallback, useMemo, useState } from 'react';
import { v4 } from 'uuid';

type SvgImagePropsType = {
  src: string;
  className?: string;
  isBlur?: boolean;
  isGrayScale?: boolean;
  objectFit?: string;
};

const SvgImage: FC<SvgImagePropsType> = ({
  src,
  className,
  isBlur,
  isGrayScale,
  objectFit,
}) => {
  const [showSrc, changeShowSrc] = useState(src);

  const onError = useCallback(() => {
    changeShowSrc('');
  }, [changeShowSrc]);

  const imageId = useMemo(() => {
    return v4();
  }, []);

  const filter = useMemo(() => {
    const filter = `url(#${imageId})`;
    return isBlur || isGrayScale ? filter : null;
  }, [imageId, isBlur, isGrayScale]);

  const aspectRatio = useMemo(() => {
    if (objectFit === 'cover') {
      return 'xMidYMid slice';
    }

    return undefined;
  }, [objectFit]);

  return (
    <svg key={src} className={className}>
      <defs>
        <filter id={imageId}>
          {isBlur && <feGaussianBlur in="SourceGraphic" stdDeviation="6" />}
          {isGrayScale && (
            <feColorMatrix
              type="matrix"
              values="0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0"
            />
          )}
        </filter>
      </defs>
      <image
        x="0"
        y="0"
        width="100%"
        height="100%"
        externalResourcesRequired="true"
        preserveAspectRatio={aspectRatio}
        xlinkHref={showSrc}
        filter={filter}
        onError={onError}
      />
    </svg>
  );
};

export default SvgImage;
