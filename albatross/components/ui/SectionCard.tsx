import type { ReactNode } from 'react';
import type { ViewStyle } from 'react-native';

import { Card } from '@/components/ui/Card';
import { SectionHeader } from '@/components/ui/SectionHeader';

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  /** Optional slot (e.g. habit count badge) */
  right?: ReactNode;
  children: ReactNode;
  cardStyle?: ViewStyle;
};

/**
 * Elevated card with eyebrow / title / description and custom body.
 */
export function SectionCard({
  eyebrow,
  title,
  description,
  right,
  children,
  cardStyle,
}: Props) {
  return (
    <Card style={cardStyle}>
      <SectionHeader
        eyebrow={eyebrow}
        title={title}
        description={description}
        right={right}
      />
      {children}
    </Card>
  );
}
