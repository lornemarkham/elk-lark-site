import { Platform, StyleSheet, Text, View } from 'react-native';
import Slider from '@react-native-community/slider';

import { theme } from '@/constants/theme';

type Props = {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  onSlidingStart?: (value: number) => void;
  onSlidingComplete?: (value: number) => void;
  /** When false, hide the numeric value column (e.g. value is already in `label`). Default true. */
  showValue?: boolean;
};

/**
 * Thin-track slider — matches My Morning / Evening reflection styling.
 */
export function SliderRow({
  label,
  value,
  min,
  max,
  step,
  onChange,
  onSlidingStart,
  onSlidingComplete,
  showValue = true,
}: Props) {
  return (
    <View style={styles.sliderRow}>
      <View style={styles.sliderHeader}>
        <Text style={styles.sliderLabel}>{label}</Text>
        {showValue ? (
          <Text style={styles.sliderValue}>{value}</Text>
        ) : null}
      </View>
      <View style={styles.sliderTrackShell}>
        <Slider
          style={styles.slider}
          minimumValue={min}
          maximumValue={max}
          step={step}
          value={value}
          onValueChange={onChange}
          onSlidingStart={onSlidingStart}
          onSlidingComplete={onSlidingComplete}
          minimumTrackTintColor={theme.colors.sliderTrackActive}
          maximumTrackTintColor={theme.colors.sliderTrackInactive}
          thumbTintColor={theme.colors.sliderThumb}
          tapToSeek={Platform.OS === 'ios'}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sliderRow: {
    gap: theme.spacing.xs,
  },
  sliderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    gap: theme.spacing.md,
  },
  sliderLabel: {
    ...theme.typography.bodyMedium,
    color: theme.colors.text,
    flex: 1,
  },
  sliderValue: {
    ...theme.typography.bodyMedium,
    color: theme.colors.text,
    minWidth: 24,
    textAlign: 'right',
    fontVariant: ['tabular-nums'],
  },
  sliderTrackShell: {
    marginTop: 4,
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderRadius: theme.radii.full,
    backgroundColor: theme.colors.sliderRail,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(61, 56, 53, 0.07)',
  },
  slider: {
    width: '100%',
    height: Platform.OS === 'ios' ? 24 : 32,
  },
});
