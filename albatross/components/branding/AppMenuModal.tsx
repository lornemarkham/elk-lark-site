import { useCallback, useEffect } from 'react';
import {
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';

import { theme } from '@/constants/theme';

export type AppMenuItemId =
  | 'settings'
  | 'crisis'
  | 'privacy'
  | 'account';

export type AppMenuItem = {
  id: AppMenuItemId;
  label: string;
};

const DEFAULT_ITEMS: AppMenuItem[] = [
  { id: 'settings', label: 'Settings' },
  { id: 'crisis', label: 'Crisis Mode' },
  { id: 'privacy', label: 'Privacy Policy' },
  { id: 'account', label: 'Account' },
];

type Props = {
  visible: boolean;
  onClose: () => void;
  /** Optional — defaults to Settings, Crisis Mode, Privacy Policy, Account */
  items?: AppMenuItem[];
  onSelectItem?: (id: AppMenuItemId) => void;
};

/**
 * Centered menu card with dimmed overlay — reusable for logo / settings entry.
 */
export function AppMenuModal({
  visible,
  onClose,
  items = DEFAULT_ITEMS,
  onSelectItem,
}: Props) {
  const { width: windowWidth } = useWindowDimensions();
  const cardMaxWidth = Math.min(400, windowWidth - theme.spacing.lg * 2);

  useEffect(() => {
    if (!visible || Platform.OS !== 'web') return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [visible, onClose]);

  const handleItem = useCallback(
    (id: AppMenuItemId) => {
      onSelectItem?.(id);
      if (__DEV__) {
        console.log(`[Albatross] Menu: ${id} (placeholder)`);
      }
      onClose();
    },
    [onSelectItem, onClose],
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={styles.root} accessibilityViewIsModal>
        <Pressable
          style={styles.backdrop}
          onPress={onClose}
          accessibilityLabel="Dismiss menu"
          accessibilityRole="button"
        />
        <View
          style={styles.centerWrap}
          pointerEvents="box-none"
        >
          <View style={[styles.card, { maxWidth: cardMaxWidth }]}>
            <Text style={styles.menuTitle}>Menu</Text>

            <View style={styles.list}>
              {items.map((item, index) => (
                <Pressable
                  key={item.id}
                  onPress={() => handleItem(item.id)}
                  style={({ pressed }) => [
                    styles.row,
                    index > 0 && styles.rowBorder,
                    pressed && styles.rowPressed,
                  ]}
                  accessibilityRole="button"
                  accessibilityLabel={item.label}
                >
                  <Text style={styles.rowLabel}>{item.label}</Text>
                </Pressable>
              ))}
            </View>

            <Pressable
              onPress={onClose}
              style={({ pressed }) => [
                styles.closeBtn,
                pressed && styles.closeBtnPressed,
              ]}
              accessibilityRole="button"
              accessibilityLabel="Close menu"
            >
              <Text style={styles.closeLabel}>Close</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(45, 38, 34, 0.42)',
  },
  centerWrap: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
  },
  card: {
    width: '100%',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.xl,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.border,
    paddingTop: theme.spacing.lg,
    paddingHorizontal: theme.spacing.md,
    paddingBottom: theme.spacing.md,
    ...Platform.select({
      ios: {
        shadowColor: theme.colors.shadow,
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.18,
        shadowRadius: 28,
      },
      android: {
        elevation: 8,
      },
      default: {},
    }),
  },
  menuTitle: {
    ...theme.typography.title,
    fontSize: 20,
    lineHeight: 26,
    color: theme.colors.text,
    letterSpacing: -0.2,
    marginBottom: theme.spacing.sm,
    paddingHorizontal: theme.spacing.xs,
  },
  list: {
    borderRadius: theme.radii.md,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 252, 250, 0.65)',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(61, 56, 53, 0.06)',
  },
  row: {
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
  },
  rowBorder: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(61, 56, 53, 0.07)',
  },
  rowPressed: {
    backgroundColor: 'rgba(196, 165, 154, 0.12)',
  },
  rowLabel: {
    ...theme.typography.bodyMedium,
    fontSize: 16,
    lineHeight: 22,
    color: theme.colors.text,
  },
  closeBtn: {
    marginTop: theme.spacing.md,
    alignSelf: 'center',
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.xl,
    borderRadius: theme.radii.full,
    backgroundColor: theme.colors.accentSoft,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.border,
  },
  closeBtnPressed: {
    opacity: 0.88,
  },
  closeLabel: {
    ...theme.typography.bodyMedium,
    fontSize: 15,
    lineHeight: 20,
    color: theme.colors.text,
  },
});
