import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Slider } from '@/components/ui/Slider';
import { myMorningSliderScale } from '@/constants/home';
import { theme } from '@/constants/theme';
import type { WeeklyPatternSlider } from '@/types/wheel';

type Props = {
  sliders: WeeklyPatternSlider[];
};

/**
 * Weekly rhythm sliders — same rail styling as home; mock defaults from data layer.
 */
export function WeeklyPatternsSection({ sliders }: Props) {
  const [values, setValues] = useState<Record<string, number>>(() =>
    Object.fromEntries(sliders.map((s) => [s.id, s.defaultValue])),
  );

  const { min, max, step } = myMorningSliderScale;

  return (
    <View style={styles.stack}>
      {sliders.map((s) => (
        <Slider
          key={s.id}
          label={s.label}
          value={values[s.id] ?? s.defaultValue}
          min={min}
          max={max}
          step={step}
          onChange={(v) => setValues((prev) => ({ ...prev, [s.id]: v }))}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  stack: {
    gap: theme.spacing.lg,
  },
});
