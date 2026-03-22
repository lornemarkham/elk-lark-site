import { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { InputField } from '@/components/ui/InputField';
import { theme } from '@/constants/theme';
import type { WeeklyReflectionPrompt } from '@/types/wheel';

type Props = {
  prompts: WeeklyReflectionPrompt[];
};

/**
 * Stack of reflection prompts + multiline inputs — wire to persistence later.
 */
export function WeeklyReflectionSection({ prompts }: Props) {
  const initial = useMemo(
    () => Object.fromEntries(prompts.map((p) => [p.id, ''])),
    [prompts],
  );
  const [answers, setAnswers] =
    useState<Record<string, string>>(initial);

  const setAnswer = (id: string, text: string) => {
    setAnswers((prev) => ({ ...prev, [id]: text }));
  };

  return (
    <View style={styles.stack}>
      {prompts.map((p) => (
        <InputField
          key={p.id}
          label={p.label}
          value={answers[p.id] ?? ''}
          onChangeText={(t) => setAnswer(p.id, t)}
          placeholder={p.placeholder}
          multiline
          minHeight={88}
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
