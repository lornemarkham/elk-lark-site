import { StyleSheet, Text, TextInput, View } from 'react-native';
import type { TextInputProps, TextStyle, ViewStyle } from 'react-native';

import { theme } from '@/constants/theme';

export type InputFieldProps = TextInputProps & {
  label?: string;
  labelTone?: 'default' | 'compact';
  /** Space between label and input — `relaxed` matches intention / section spacing. */
  labelGap?: 'default' | 'relaxed';
  containerStyle?: ViewStyle;
  /** Overrides default min height (48 single-line, 88 multiline). */
  minHeight?: number;
  /** Softer border/fill — journal and calm surfaces. */
  variant?: 'default' | 'soft';
};

/**
 * Standard bordered text field — aligned with My Morning / wheel / journal inputs.
 */
export function InputField({
  label,
  labelTone = 'default',
  labelGap = 'default',
  containerStyle,
  placeholderTextColor = theme.colors.textMuted,
  multiline,
  minHeight,
  variant = 'default',
  style,
  ...rest
}: InputFieldProps) {
  const gap =
    labelGap === 'relaxed' ? theme.spacing.sm : theme.spacing.xs;

  const resolvedMinHeight =
    minHeight ?? (multiline ? 88 : 48);

  const labelStyle =
    labelTone === 'compact' ? styles.labelCompact : styles.labelDefault;

  return (
    <View style={[{ gap }, containerStyle]}>
      {label ? <Text style={labelStyle}>{label}</Text> : null}
      <TextInput
        {...rest}
        placeholderTextColor={placeholderTextColor}
        multiline={multiline}
        textAlignVertical={multiline ? 'top' : undefined}
        style={[
          styles.input,
          variant === 'soft' && styles.inputSoft,
          { minHeight: resolvedMinHeight },
          style as TextStyle,
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  labelDefault: {
    ...theme.typography.bodyMedium,
    color: theme.colors.text,
  },
  labelCompact: {
    ...theme.typography.bodyMedium,
    fontSize: 13,
    color: theme.colors.text,
  },
  input: {
    ...theme.typography.body,
    color: theme.colors.text,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.radii.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
  },
  inputSoft: {
    borderWidth: 1,
    borderColor: 'rgba(61, 56, 53, 0.06)',
    backgroundColor: 'rgba(255, 252, 250, 0.92)',
  },
});
