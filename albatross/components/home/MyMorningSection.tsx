import { StyleSheet, View } from 'react-native';

import { SectionCard } from '@/components/ui/SectionCard';
import { Dropdown } from '@/components/ui/Dropdown';
import { InputField } from '@/components/ui/InputField';
import { Slider } from '@/components/ui/Slider';
import {
  homeSections,
  myMorningIdentityLabel,
  myMorningIdentityOptions,
  myMorningIntentionLabel,
  myMorningIntentionPlaceholder,
  myMorningSliderScale,
} from '@/constants/home';
import { theme } from '@/constants/theme';
import type { MorningInputs } from '@/types/morning';

type Props = {
  morning: MorningInputs;
  onMorningChange: (patch: Partial<MorningInputs>) => void;
};

/**
 * First step of the daily flow: sliders, identity dropdown, intention — state owned by HomeScreen for Today’s Read.
 */
export function MyMorningSection({ morning, onMorningChange }: Props) {
  const copy = homeSections.morning;

  const { mood, energy, stress, identity, intention } = morning;

  const { min, max, step } = myMorningSliderScale;

  return (
    <SectionCard
      eyebrow={copy.eyebrow}
      title={copy.title}
      description={copy.description}
    >
      <View style={styles.stack}>
        <Slider
          label="Mood"
          value={mood}
          min={min}
          max={max}
          step={step}
          onChange={(v) => onMorningChange({ mood: v })}
        />
        <Slider
          label="Energy"
          value={energy}
          min={min}
          max={max}
          step={step}
          onChange={(v) => onMorningChange({ energy: v })}
        />
        <Slider
          label="Stress"
          value={stress}
          min={min}
          max={max}
          step={step}
          onChange={(v) => onMorningChange({ stress: v })}
        />
      </View>

      <Dropdown
        label={myMorningIdentityLabel}
        options={myMorningIdentityOptions}
        value={identity}
        onValueChange={(v) => onMorningChange({ identity: v })}
      />

      <View style={styles.intentionBlock}>
        <InputField
          label={myMorningIntentionLabel}
          labelGap="relaxed"
          value={intention}
          onChangeText={(t) => onMorningChange({ intention: t })}
          placeholder={myMorningIntentionPlaceholder}
          multiline
          minHeight={88}
        />
      </View>
    </SectionCard>
  );
}

const styles = StyleSheet.create({
  stack: {
    gap: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  intentionBlock: {
    marginTop: theme.spacing.xs,
  },
});
