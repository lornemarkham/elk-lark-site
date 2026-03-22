import { useMemo } from 'react';
import { useWindowDimensions } from 'react-native';

import { theme } from '@/constants/theme';

/**
 * iPad-first: constrain readable width on tablets; comfortable padding on phones.
 */
export function useContentLayout() {
  const { width } = useWindowDimensions();

  return useMemo(() => {
    const isWide = width >= 768;
    const horizontalPadding = isWide
      ? theme.layout.padWide
      : theme.layout.padCompact;
    const contentWidth = Math.min(
      theme.layout.maxContentWidth,
      width - horizontalPadding * 2,
    );

    return {
      width,
      isWide,
      horizontalPadding,
      contentWidth,
    };
  }, [width]);
}
