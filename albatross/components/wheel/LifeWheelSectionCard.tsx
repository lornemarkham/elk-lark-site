import type { ReactNode } from 'react';
import { StyleSheet, View, type ViewStyle } from 'react-native';

import { Card } from '@/components/ui/Card';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { theme } from '@/constants/theme';

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  right?: ReactNode;
  children: ReactNode;
  cardStyle?: ViewStyle;
};

/**
 * Life wheel card — clean surface, no decorative backdrops (wheel carries color).
 */
export function LifeWheelSectionCard({
  eyebrow,
  title,
  description,
  right,
  children,
  cardStyle,
}: Props) {
  return (
    <Card style={StyleSheet.flatten([styles.card, cardStyle])}>
      <View style={styles.foreground}>
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          description={description}
          right={right}
        />
        {children}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: theme.colors.surfaceElevated,
  },
  foreground: {
    position: 'relative',
    zIndex: 1,
  },
});
