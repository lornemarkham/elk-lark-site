import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { AppLogoFloatingAction } from '@/components/branding/AppLogoFloatingAction';
import { theme } from '@/constants/theme';

const ICON_SIZE = 24;

export default function TabLayout() {
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
      <AppLogoFloatingAction />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
