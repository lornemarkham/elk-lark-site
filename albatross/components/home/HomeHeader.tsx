import { StyleSheet, Text, View } from 'react-native';

import { ScreenHeaderTitleRow } from '@/components/branding/ScreenHeaderTitleRow';
import { homeApp } from '@/constants/home';
import { theme } from '@/constants/theme';

/**
 * Title and subtitle — typography-led, minimal chrome.
 */
export function HomeHeader() {
  return (
    <View style={styles.header}>
      <ScreenHeaderTitleRow title={homeApp.title} titleStyle={styles.title}>
        <Text style={styles.subtitle}>{homeApp.subtitle}</Text>
      </ScreenHeaderTitleRow>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },
  title: {
    ...theme.typography.display,
    color: theme.colors.text,
    letterSpacing: -0.3,
    fontSize: 28,
    lineHeight: 34,
  },
  subtitle: {
    ...theme.typography.body,
    color: theme.colors.textMuted,
    maxWidth: 520,
    lineHeight: 23,
  },
});
