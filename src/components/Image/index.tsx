import React, { FC, useMemo } from 'react';

import LazyLoad from 'react-lazyload';
import SvgImage from '@/components/Image/SvgImage';
import { isNotSupportObjectFit } from '@/constants/detector';

export type ImagePropsType = {
  src: string;
  alt: string;
  className?: string;
  isBlur?: boolean;
  isGrayScale?: boolean;
  objectFit?: 'cover';
};

const Image: FC<ImagePropsType> = ({
  src,
  alt,
  className,
  isBlur,
  isGrayScale,
  objectFit,
}) => {
  const isNotSupport = useMemo(() => {
    return isNotSupportObjectFit();
  }, []);

  if (objectFit && isNotSupport) {
    return (
      <SvgImage
        src={src}
        className={className}
        isBlur={isBlur}
        isGrayScale={isGrayScale}
        objectFit={objectFit}
      />
    );
  }

  const ImageComponent: FC = useMemo(
    () => () => <img src={src} alt={alt} className={className} />,
    [src, alt, className]
  );

  return (
    <>
      <LazyLoad>
        <ImageComponent />
      </LazyLoad>
      <noscript>
        <style>{`.lazyload-placeholder { display: none; }`}</style>
        <ImageComponent />
      </noscript>
    </>
  );
};

export default Image;
