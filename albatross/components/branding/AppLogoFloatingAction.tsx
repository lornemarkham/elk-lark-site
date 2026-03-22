import { useState } from 'react';
import { Platform, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppLogoMark, APP_LOGO_MARK_SIZE } from '@/components/branding/AppLogoMark';
import { AppMenuModal } from '@/components/branding/AppMenuModal';
import { theme } from '@/constants/theme';

/** ~30% larger than the previous header mark (44px) — calm, tappable control. */
export const APP_LOGO_FLOAT_SIZE = Math.round(APP_LOGO_MARK_SIZE * 1.3);

const EDGE_H = 22;
const EDGE_V_GAP = 14;
/** Default tab bar height when we cannot read navigator context (FAB sits above bar). */
const TAB_BAR_APPROX = 52;

/**
 * Global floating logo — settings entry (placeholder). Fixed bottom-right above tab bar.
 */
export function AppLogoFloatingAction() {
  const insets = useSafeAreaInsets();
  const [menuVisible, setMenuVisible] = useState(false);

  const bottom = TAB_BAR_APPROX + EDGE_V_GAP + insets.bottom;
  const right = EDGE_H + insets.right;

  return (
    <>
      <Pressable
        onPress={() => setMenuVisible(true)}
        style={({ pressed }) => [
          styles.anchor,
          {
            bottom,
            right,
            opacity: pressed ? 0.92 : 1,
          },
        ]}
        accessibilityRole="button"
        accessibilityLabel="Menu"
        accessibilityHint="Opens the app menu"
      >
        <View style={styles.pill}>
          <AppLogoMark size={APP_LOGO_FLOAT_SIZE} decorative />
        </View>
      </Pressable>
      <AppMenuModal visible={menuVisible} onClose={() => setMenuVisible(false)} />
    </>
  );
}

const styles = StyleSheet.create({
  anchor: {
    position: 'absolute',
    zIndex: 100,
  },
  pill: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 999,
    backgroundColor: theme.colors.surfaceElevated,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(61, 56, 53, 0.08)',
    ...Platform.select({
      ios: {
        shadowColor: theme.colors.shadow,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.14,
        shadowRadius: 14,
      },
      android: {
        elevation: 5,
      },
      default: {},
    }),
  },
});
