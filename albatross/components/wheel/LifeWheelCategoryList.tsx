import { Ionicons } from '@expo/vector-icons';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { theme } from '@/constants/theme';
import type { LifeWheelDimension } from '@/types/wheel';

type Props = {
  dimensions: LifeWheelDimension[];
  selectedId: string | null;
  onSelectDimension: (id: string | null) => void;
  editingLabelId: string | null;
  editingLabelValue: string;
  onStartEditLabel: (id: string, currentLabel: string) => void;
  onChangeEditingLabel: (text: string) => void;
  onCommitEditingLabel: () => void;
  canAddCategory: boolean;
  canRemoveCategory: boolean;
  onStartAddArea: () => void;
  addingArea: boolean;
  newAreaDraft: string;
  onChangeNewAreaDraft: (text: string) => void;
  onConfirmNewArea: () => void;
  onCancelNewArea: () => void;
  addAreaError: string | null;
  onRemoveSelectedCategory: () => void;
};

/**
 * Areas list — mirrors wheel colors; rename via pencil; add requires a name first.
 */
export function LifeWheelCategoryList({
  dimensions,
  selectedId,
  onSelectDimension,
  editingLabelId,
  editingLabelValue,
  onStartEditLabel,
  onChangeEditingLabel,
  onCommitEditingLabel,
  canAddCategory,
  canRemoveCategory,
  onStartAddArea,
  addingArea,
  newAreaDraft,
  onChangeNewAreaDraft,
  onConfirmNewArea,
  onCancelNewArea,
  addAreaError,
  onRemoveSelectedCategory,
}: Props) {
  return (
    <View style={styles.wrap} accessibilityRole="list">
      <Text style={styles.listHeading}>Areas</Text>
      {dimensions.map((d) => {
        const selected = selectedId === d.id;
        const editing = editingLabelId === d.id;
        return (
          <View
            key={d.id}
            style={[
              styles.row,
              selected && styles.rowSelected,
              selected && {
                borderLeftWidth: 3,
                borderLeftColor: d.color,
              },
            ]}
          >
            <Pressable
              style={styles.rowHit}
              onPress={() => {
                if (editing) return;
                onSelectDimension(selected ? null : d.id);
              }}
              accessibilityRole="button"
              accessibilityState={{ selected }}
              accessibilityLabel={
                editing
                  ? `Editing name for ${d.label}`
                  : `${d.label}, ${d.value} out of 10. ${selected ? 'Selected' : 'Tap to select'}.`
              }
            >
              <View
                style={[
                  styles.marker,
                  { backgroundColor: d.color },
                  selected && styles.markerSelected,
                ]}
              />
              {editing ? (
                <TextInput
                  style={styles.labelInput}
                  value={editingLabelValue}
                  onChangeText={onChangeEditingLabel}
                  onBlur={onCommitEditingLabel}
                  onSubmitEditing={onCommitEditingLabel}
                  returnKeyType="done"
                  autoFocus
                  selectTextOnFocus
                  accessibilityLabel="Area name"
                />
              ) : (
                <Text
                  style={[styles.label, selected && styles.labelSelected]}
                  numberOfLines={2}
                >
                  {d.label}
                </Text>
              )}
              <Text style={[styles.score, selected && styles.scoreSelected]}>
                {d.value}
                <Text style={styles.scoreOut}>/10</Text>
              </Text>
            </Pressable>
            {!editing ? (
              <Pressable
                hitSlop={10}
                onPress={() => onStartEditLabel(d.id, d.label)}
                style={({ pressed }) => [
                  styles.renameBtn,
                  pressed && { opacity: 0.72 },
                ]}
                accessibilityRole="button"
                accessibilityLabel={`Rename ${d.label}`}
              >
                <Ionicons
                  name="pencil-outline"
                  size={16}
                  color={theme.colors.textMuted}
                />
              </Pressable>
            ) : null}
          </View>
        );
      })}

      {addingArea ? (
        <View style={styles.addPanel}>
          <TextInput
            style={styles.addInput}
            value={newAreaDraft}
            onChangeText={onChangeNewAreaDraft}
            placeholder="Name this area"
            placeholderTextColor={theme.colors.textMuted}
            returnKeyType="done"
            onSubmitEditing={onConfirmNewArea}
            autoFocus
            accessibilityLabel="Name for new area"
          />
          <View style={styles.addActions}>
            <Pressable
              onPress={onConfirmNewArea}
              style={({ pressed }) => [
                styles.addConfirm,
                pressed && styles.actionPressed,
              ]}
              accessibilityRole="button"
              accessibilityLabel="Add area"
            >
              <Text style={styles.addConfirmText}>Add</Text>
            </Pressable>
            <Pressable
              onPress={onCancelNewArea}
              style={({ pressed }) => pressed && styles.actionPressed}
              accessibilityRole="button"
              accessibilityLabel="Cancel adding area"
            >
              <Text style={styles.addCancelText}>Cancel</Text>
            </Pressable>
          </View>
          {addAreaError ? (
            <Text style={styles.addError}>{addAreaError}</Text>
          ) : null}
        </View>
      ) : null}

      <View style={styles.actions}>
        {canAddCategory && !addingArea ? (
          <Pressable
            onPress={onStartAddArea}
            style={({ pressed }) => pressed && styles.actionPressed}
            accessibilityRole="button"
            accessibilityLabel="Add a named life area"
          >
            <Text style={styles.actionAdd}>+ Add area (name required)</Text>
          </Pressable>
        ) : null}
        {canRemoveCategory && selectedId != null ? (
          <Pressable
            onPress={onRemoveSelectedCategory}
            style={({ pressed }) => pressed && styles.actionPressed}
            accessibilityRole="button"
            accessibilityLabel="Remove selected life area"
          >
            <Text style={styles.actionRemove}>Remove this area</Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: theme.spacing.xs,
    width: '100%',
  },
  listHeading: {
    ...theme.typography.caption,
    fontSize: 11,
    lineHeight: 15,
    letterSpacing: 0.55,
    textTransform: 'uppercase',
    color: theme.colors.textMuted,
    marginBottom: theme.spacing.xs,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
    paddingVertical: 4,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.sm,
    borderRadius: theme.radii.md,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  rowSelected: {
    backgroundColor: theme.colors.surfaceElevated,
    borderColor: theme.colors.border,
  },
  rowHit: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    paddingVertical: 10,
    minHeight: 44,
  },
  marker: {
    width: 10,
    height: 10,
    borderRadius: 5,
    flexShrink: 0,
  },
  markerSelected: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(61, 56, 53, 0.2)',
  },
  label: {
    ...theme.typography.bodyMedium,
    flex: 1,
    color: theme.colors.text,
    fontSize: 15,
    lineHeight: 20,
  },
  labelInput: {
    ...theme.typography.bodyMedium,
    flex: 1,
    color: theme.colors.text,
    fontSize: 15,
    lineHeight: 20,
    paddingVertical: 0,
    paddingHorizontal: 0,
    margin: 0,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.colors.borderStrong,
  },
  labelSelected: {
    fontFamily: 'DMSans_500Medium',
  },
  renameBtn: {
    padding: theme.spacing.sm,
    justifyContent: 'center',
  },
  score: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 16,
    lineHeight: 18,
    color: theme.colors.text,
    fontVariant: ['tabular-nums'],
  },
  scoreSelected: {
    color: theme.colors.text,
  },
  scoreOut: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 13,
    color: theme.colors.textMuted,
  },
  addPanel: {
    marginTop: theme.spacing.sm,
    padding: theme.spacing.md,
    borderRadius: theme.radii.md,
    backgroundColor: theme.colors.accentSoft,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.border,
    gap: theme.spacing.sm,
  },
  addInput: {
    ...theme.typography.bodyMedium,
    color: theme.colors.text,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.sm,
    borderRadius: theme.radii.sm,
    backgroundColor: theme.colors.surfaceElevated,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.border,
  },
  addActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  addConfirm: {
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.sm,
  },
  addConfirmText: {
    ...theme.typography.caption,
    fontFamily: 'DMSans_500Medium',
    fontSize: 14,
    color: theme.colors.accent,
  },
  addCancelText: {
    ...theme.typography.caption,
    fontSize: 14,
    color: theme.colors.textMuted,
  },
  addError: {
    ...theme.typography.caption,
    fontSize: 12,
    color: theme.colors.textMuted,
  },
  actions: {
    gap: theme.spacing.sm,
    marginTop: theme.spacing.sm,
    paddingHorizontal: theme.spacing.xs,
  },
  actionAdd: {
    ...theme.typography.caption,
    fontFamily: 'DMSans_500Medium',
    fontSize: 13,
    color: theme.colors.accent,
  },
  actionRemove: {
    ...theme.typography.caption,
    fontSize: 13,
    color: theme.colors.textMuted,
  },
  actionPressed: {
    opacity: 0.78,
  },
});
