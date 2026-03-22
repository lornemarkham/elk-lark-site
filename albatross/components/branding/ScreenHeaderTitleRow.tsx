import type { ReactNode } from 'react';
import { StyleSheet, Text, View, type TextStyle } from 'react-native';

import { theme } from '@/constants/theme';

type Props = {
  title: string;
  titleStyle?: TextStyle;
  children?: ReactNode;
};

/**
 * Top-of-screen title + optional content below (subtitle, etc.).
 */
export function ScreenHeaderTitleRow({ title, titleStyle, children }: Props) {
  return (
    <View style={styles.wrap}>
      <Text style={[styles.title, titleStyle]} numberOfLines={2}>
        {title}
      </Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: theme.spacing.sm,
  },
  title: {
    ...theme.typography.display,
    fontSize: 26,
    lineHeight: 32,
    color: theme.colors.text,
    letterSpacing: -0.25,
  },
});
