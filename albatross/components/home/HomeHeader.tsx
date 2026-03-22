import { StyleSheet, Text, View } from 'react-native';

import { ScreenHeaderTitleRow } from '@/components/branding/ScreenHeaderTitleRow';
import { ProgressDots } from '@/components/home/ProgressDots';
import { homeApp } from '@/constants/home';
import { theme } from '@/constants/theme';

type Props = {
  activeIndex: number;
  sectionCount: number;
};

/**
 * Title, subtitle, and scroll progress dots — typography-led, minimal chrome.
 */
export function HomeHeader({ activeIndex, sectionCount }: Props) {
  return (
    <View style={styles.header}>
      <ScreenHeaderTitleRow title={homeApp.title} titleStyle={styles.title}>
        <View style={styles.belowTitle}>
          <Text style={styles.subtitle}>{homeApp.subtitle}</Text>
          <ProgressDots total={sectionCount} activeIndex={activeIndex} />
        </View>
      </ScreenHeaderTitleRow>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },
  belowTitle: {
    gap: theme.spacing.sm,
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
