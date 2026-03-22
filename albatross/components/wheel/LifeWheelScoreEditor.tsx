import { StyleSheet, View } from 'react-native';

import { SliderRow } from '@/components/ui/SliderRow';
import { theme } from '@/constants/theme';
import type { LifeWheelDimension } from '@/types/wheel';

type Props = {
  dimensions: LifeWheelDimension[];
  onChangeValue: (id: string, value: number) => void;
  /** While a slider is being dragged — drives wheel segment highlight in edit mode. */
  onActiveSliderChange?: (id: string | null) => void;
};

const MIN = 0;
const MAX = 10;
const STEP = 1;

/**
 * One slider per life area — 0–10, updates parent state (local-only; no persistence).
 */
export function LifeWheelScoreEditor({
  dimensions,
  onChangeValue,
  onActiveSliderChange,
}: Props) {
  return (
    <View style={styles.wrap}>
      {dimensions.map((d) => (
        <SliderRow
          key={d.id}
          label={d.label}
          value={d.value}
          min={MIN}
          max={MAX}
          step={STEP}
          onChange={(v) => onChangeValue(d.id, v)}
          onSlidingStart={
            onActiveSliderChange ? () => onActiveSliderChange(d.id) : undefined
          }
          onSlidingComplete={
            onActiveSliderChange ? () => onActiveSliderChange(null) : undefined
          }
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: theme.spacing.lg,
    marginTop: theme.spacing.xs,
  },
});
