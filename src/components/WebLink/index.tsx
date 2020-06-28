import React, { FC, ReactNode, useMemo } from 'react';
import Link from 'next/link';

type WebLinkPropsType = {
  href: string;
  as?: string;
  target?: '_blank';
  className?: string;
  children: ReactNode;
};

const WebLink: FC<WebLinkPropsType> = ({
  href,
  as,
  target,
  className,
  children,
}) => {
  const isExternal = useMemo(() => {
    return target === '_blank' || href.indexOf('http') === 0;
  }, [target, href]);

  if (isExternal) {
    return (
      <a
        className={className}
        href={href}
        target={target}
        rel={target === '_blank' ? 'noreferrer noopener' : undefined}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} as={as}>
      <a
        className={className}
        target={target}
        rel={target === '_blank' ? 'noreferrer noopener' : undefined}>
        {children}
      </a>
    </Link>
  );
};

export default WebLink;
