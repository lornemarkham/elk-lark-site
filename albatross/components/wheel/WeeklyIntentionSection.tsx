import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Dropdown, type SelectOption } from '@/components/ui/Dropdown';
import { InputField } from '@/components/ui/InputField';
import { theme } from '@/constants/theme';
import type { WeeklyOutcomeField } from '@/types/wheel';

type Props = {
  dropdownLabel: string;
  themeOptions: readonly SelectOption[];
  initialTheme: string | null;
  outcomes: WeeklyOutcomeField[];
  alignmentPrompt: string;
};

/**
 * Weekly theme dropdown, three outcome fields, and an alignment prompt.
 */
export function WeeklyIntentionSection({
  dropdownLabel,
  themeOptions,
  initialTheme,
  outcomes,
  alignmentPrompt,
}: Props) {
  const [themeValue, setThemeValue] = useState<string | null>(initialTheme);
  const [outcomeText, setOutcomeText] = useState<Record<string, string>>(() =>
    Object.fromEntries(outcomes.map((o) => [o.id, ''])),
  );
  const [alignment, setAlignment] = useState('');

  return (
    <View style={styles.stack}>
      <Dropdown
        label={dropdownLabel}
        options={themeOptions}
        value={themeValue}
        onValueChange={setThemeValue}
        placeholder="Choose a theme…"
      />

      <View style={styles.outcomes}>
        {outcomes.map((o) => (
          <InputField
            key={o.id}
            label={o.label}
            labelTone="compact"
            value={outcomeText[o.id] ?? ''}
            onChangeText={(t) =>
              setOutcomeText((prev) => ({ ...prev, [o.id]: t }))
            }
            placeholder={o.placeholder}
            multiline
            minHeight={72}
          />
        ))}
      </View>

      <InputField
        label={alignmentPrompt}
        value={alignment}
        onChangeText={setAlignment}
        placeholder="One or two calm lines…"
        multiline
        minHeight={72}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  stack: {
    gap: theme.spacing.md,
  },
  outcomes: {
    gap: theme.spacing.md,
    marginTop: theme.spacing.xs,
  },
});
