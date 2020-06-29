import React, { FC, useMemo } from 'react';
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

  if (isNotSupport) {
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

  return <img src={src} alt={alt} className={className} />;
};

export default Image;
