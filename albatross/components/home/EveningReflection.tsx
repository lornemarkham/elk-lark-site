import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { ReflectionPromptRow } from '@/components/home/ReflectionPromptRow';
import { SectionCard } from '@/components/ui/SectionCard';
import { Slider } from '@/components/ui/Slider';
import {
  eveningReflectionRows,
  homeSections,
  myMorningSliderScale,
} from '@/constants/home';
import { theme } from '@/constants/theme';

export function EveningReflection() {
  const copy = homeSections.evening;
  const { min, max, step } = myMorningSliderScale;

  const [focusedRowId, setFocusedRowId] = useState<string | null>(null);

  const [energy, setEnergy] = useState(5);
  const [presence, setPresence] = useState(5);
  const [courage, setCourage] = useState(5);
  const [vulnerability, setVulnerability] = useState(5);

  const toggleRow = (id: string) => {
    setFocusedRowId((prev) => (prev === id ? null : id));
  };

  return (
    <SectionCard
      eyebrow={copy.eyebrow}
      title={copy.title}
      description={copy.description}
    >
      <View style={styles.reflectionBlock}>
        {eveningReflectionRows.map((row) => (
          <ReflectionPromptRow
            key={row.id}
            label={row.label}
            hint={row.hint}
            selected={focusedRowId === row.id}
            onPress={() => toggleRow(row.id)}
          />
        ))}
      </View>

      <Text style={styles.slidersHeading}>How you’re landing</Text>
      <View style={styles.sliders}>
        <Slider
          label="Energy"
          value={energy}
          min={min}
          max={max}
          step={step}
          onChange={setEnergy}
        />
        <Slider
          label="Presence"
          value={presence}
          min={min}
          max={max}
          step={step}
          onChange={setPresence}
        />
        <Slider
          label="Courage"
          value={courage}
          min={min}
          max={max}
          step={step}
          onChange={setCourage}
        />
        <Slider
          label="Vulnerability"
          value={vulnerability}
          min={min}
          max={max}
          step={step}
          onChange={setVulnerability}
        />
      </View>
    </SectionCard>
  );
}

const styles = StyleSheet.create({
  reflectionBlock: {
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.lg,
  },
  slidersHeading: {
    ...theme.typography.bodyMedium,
    color: theme.colors.textMuted,
    marginBottom: theme.spacing.sm,
  },
  sliders: {
    gap: theme.spacing.lg,
  },
});
