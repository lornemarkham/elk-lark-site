import { useMemo, useState } from 'react';
import {
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { theme } from '@/constants/theme';

export type SelectOption = { value: string; label: string };

type Props = {
  /** Field label shown above the control */
  label: string;
  options: readonly SelectOption[];
  value: string | null;
  onValueChange: (value: string) => void;
  placeholder?: string;
  /** Optional title in the sheet (defaults to label) */
  sheetTitle?: string;
};

/**
 * Calm dropdown: trigger row + modal list (options from data / constants).
 */
export function SelectDropdown({
  label,
  options,
  value,
  onValueChange,
  placeholder = 'Choose…',
  sheetTitle,
}: Props) {
  const [open, setOpen] = useState(false);
  const insets = useSafeAreaInsets();

  const selectedLabel = useMemo(() => {
    if (value == null) return null;
    return options.find((o) => o.value === value)?.label ?? null;
  }, [options, value]);

  const title = sheetTitle ?? label;

  const handleSelect = (v: string) => {
    onValueChange(v);
    setOpen(false);
  };

  return (
    <View style={styles.wrap}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <Pressable
        onPress={() => setOpen(true)}
        style={({ pressed }) => [
          styles.trigger,
          pressed && { opacity: 0.92 },
        ]}
        accessibilityRole="button"
        accessibilityLabel={selectedLabel ?? placeholder}
      >
        <Text
          style={[
            styles.triggerText,
            !selectedLabel && styles.triggerPlaceholder,
          ]}
          numberOfLines={1}
        >
          {selectedLabel ?? placeholder}
        </Text>
        <Ionicons name="chevron-down" size={18} color={theme.colors.textMuted} />
      </Pressable>

      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <View style={styles.modalRoot}>
          <Pressable
            style={styles.backdrop}
            onPress={() => setOpen(false)}
            accessibilityRole="button"
            accessibilityLabel="Close"
          />
          <View
            style={[
              styles.sheet,
              { paddingBottom: Math.max(insets.bottom, theme.spacing.lg) },
            ]}
          >
            <View style={styles.sheetHandle} />
            <Text style={styles.sheetTitle}>{title}</Text>
            <ScrollView
              style={styles.sheetScroll}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              {options.map((opt, index) => {
                const selected = value === opt.value;
                return (
                  <Pressable
                    key={opt.value}
                    onPress={() => handleSelect(opt.value)}
                    style={({ pressed }) => [
                      styles.optionRow,
                      index > 0 && styles.optionRowBorder,
                      pressed && { backgroundColor: theme.colors.accentSoft },
                      selected && styles.optionRowSelected,
                    ]}
                  >
                    <Text
                      style={[
                        styles.optionLabel,
                        selected && styles.optionLabelSelected,
                      ]}
                    >
                      {opt.label}
                    </Text>
                    {selected ? (
                      <Ionicons
                        name="checkmark"
                        size={20}
                        color={theme.colors.accent}
                      />
                    ) : null}
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginBottom: theme.spacing.md,
  },
  fieldLabel: {
    ...theme.typography.bodyMedium,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing.sm,
    minHeight: 44,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 10,
    borderRadius: theme.radii.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
  },
  triggerText: {
    ...theme.typography.body,
    flex: 1,
    color: theme.colors.text,
  },
  triggerPlaceholder: {
    color: theme.colors.textMuted,
  },
  modalRoot: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(61, 56, 53, 0.35)',
  },
  sheet: {
    backgroundColor: theme.colors.surfaceElevated,
    borderTopLeftRadius: theme.radii.xl,
    borderTopRightRadius: theme.radii.xl,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.sm,
    maxHeight: '72%',
    ...Platform.select({
      ios: {
        shadowColor: theme.colors.shadow,
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.12,
        shadowRadius: 16,
      },
      android: { elevation: 12 },
      default: {},
    }),
  },
  sheetHandle: {
    alignSelf: 'center',
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: theme.colors.accentMuted,
    marginBottom: theme.spacing.md,
  },
  sheetTitle: {
    ...theme.typography.bodyMedium,
    fontFamily: 'Fraunces_500Medium',
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
    textAlign: 'center',
  },
  sheetScroll: {
    maxHeight: 420,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing.md,
    paddingVertical: 18,
    paddingHorizontal: theme.spacing.sm,
  },
  optionRowBorder: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: theme.colors.border,
  },
  optionRowSelected: {
    backgroundColor: theme.colors.accentSoft,
    borderRadius: theme.radii.md,
    marginHorizontal: -theme.spacing.xs,
    paddingHorizontal: theme.spacing.sm,
  },
  optionLabel: {
    ...theme.typography.body,
    flex: 1,
    color: theme.colors.text,
    lineHeight: 24,
  },
  optionLabelSelected: {
    fontFamily: 'DMSans_500Medium',
  },
});
