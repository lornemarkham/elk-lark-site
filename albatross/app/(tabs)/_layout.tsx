import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppLogoFloatingAction } from '@/components/branding/AppLogoFloatingAction';
import { theme } from '@/constants/theme';

const ICON_SIZE = 24;
/** Matches floating logo offset — tab bar height approximation. */
const TAB_BAR_APPROX = 52;

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.root}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: theme.colors.accent,
          tabBarInactiveTintColor: theme.colors.textMuted,
          tabBarLabelStyle: {
            fontFamily: 'DMSans_500Medium',
            fontSize: 11,
            letterSpacing: 0.2,
          },
          tabBarStyle: {
            backgroundColor: theme.colors.surfaceElevated,
            borderTopColor: theme.colors.border,
            borderTopWidth: StyleSheet.hairlineWidth,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Today',
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="sunny-outline"
                size={size ?? ICON_SIZE}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="calendar"
          options={{
            title: 'Calendar',
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="calendar-outline"
                size={size ?? ICON_SIZE}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="wheel"
          options={{
            title: 'Wheel',
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="aperture-outline"
                size={size ?? ICON_SIZE}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="journal"
          options={{
            title: 'Journal',
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="book-outline"
                size={size ?? ICON_SIZE}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="insights"
          options={{
            title: 'Insights',
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="sparkles-outline"
                size={size ?? ICON_SIZE}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
      <View
        pointerEvents="none"
        style={[
          styles.prototypeNote,
          { bottom: TAB_BAR_APPROX + insets.bottom + 4 },
        ]}
        accessibilityElementsHidden
        importantForAccessibility="no"
      >
        <Text style={styles.prototypeNoteText}>
          Prototype for feedback — some features are still evolving
        </Text>
      </View>
      <AppLogoFloatingAction />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  prototypeNote: {
    position: 'absolute',
    left: theme.spacing.md,
    right: theme.spacing.md,
    alignItems: 'center',
    zIndex: 4,
    paddingHorizontal: theme.spacing.xl,
  },
  prototypeNoteText: {
    fontSize: 10,
    lineHeight: 14,
    color: theme.colors.textMuted,
    opacity: 0.72,
    textAlign: 'center',
  },
});
