export const isNotSupportObjectFit = (): boolean =>
  !!(
    typeof window !== 'undefined' &&
    typeof document !== 'undefined' &&
    !('objectFit' in document.documentElement.style)
  );
