import { useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
  Animated,
  Easing,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';

import { SectionCard } from '@/components/ui/SectionCard';
import { homeSections } from '@/constants/home';
import { theme } from '@/constants/theme';
import { buildTodaysRead, isMorningAtDefaults } from '@/lib/todaysReadGuidance';
import type { MorningInputs } from '@/types/morning';

type Props = {
  morning: MorningInputs;
};

export function TodaysReadSection({ morning }: Props) {
  const router = useRouter();
  const copy = homeSections.todaysRead;
  const atDefaults = isMorningAtDefaults(morning);

  const lines = useMemo(() => {
    const tr = homeSections.todaysRead;
    if (atDefaults) {
      return {
        tone: tr.placeholderTone,
        focus: tr.placeholderFocus,
        watchOut: tr.placeholderWatchOut,
      };
    }
    return buildTodaysRead(morning);
  }, [atDefaults, morning]);

  const opacity = useRef(new Animated.Value(1)).current;
  /** `null` until first run — treated like idle so the first personalized read can glide in. */
  const prevSignature = useRef<string | null>(null);
  const prevAtDefaultsRef = useRef<boolean | null>(null);

  useLayoutEffect(() => {
    if (atDefaults) {
      prevAtDefaultsRef.current = true;
      return;
    }
    const leavingIdle = prevAtDefaultsRef.current === true;
    const firstPersonalized =
      prevAtDefaultsRef.current === null && !atDefaults;
    if (leavingIdle || firstPersonalized) {
      opacity.setValue(0);
    }
    prevAtDefaultsRef.current = false;
  }, [atDefaults, opacity]);

  const contentSignature = atDefaults
    ? 'idle'
    : `${lines.tone}|${lines.focus}|${lines.watchOut}`;

  useEffect(() => {
    if (atDefaults) {
      prevSignature.current = 'idle';
      opacity.setValue(1);
      return;
    }

    if (contentSignature === prevSignature.current) {
      return;
    }

    const wasIdle =
      prevSignature.current === 'idle' || prevSignature.current === null;
    prevSignature.current = contentSignature;

    if (wasIdle) {
      opacity.setValue(0);
      const t = setTimeout(() => {
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }).start();
      }, 200);
      return () => clearTimeout(t);
    }

    opacity.setValue(0.78);
    Animated.timing(opacity, {
      toValue: 1,
      duration: 260,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [atDefaults, contentSignature, opacity]);

  const bodyStyle = atDefaults ? styles.bodyPlaceholder : styles.body;

  return (
    <SectionCard
      eyebrow={copy.eyebrow}
      title={copy.title}
      description={atDefaults ? copy.descriptionIdle : copy.description}
    >
      <Animated.View style={atDefaults ? undefined : { opacity }}>
        <View style={styles.stack}>
          <View style={styles.block}>
            <Text style={styles.label}>Tone</Text>
            <Text style={bodyStyle}>{lines.tone}</Text>
          </View>
          <View style={styles.block}>
            <Text style={styles.label}>Focus</Text>
            <Text style={bodyStyle}>{lines.focus}</Text>
          </View>
          <View style={styles.block}>
            <Text style={styles.label}>Watch out</Text>
            <Text style={bodyStyle}>{lines.watchOut}</Text>
          </View>
        </View>
      </Animated.View>

      <Pressable
        onPress={() => router.push('/insights')}
        accessibilityRole="link"
        accessibilityHint="Opens the Insights tab"
        hitSlop={{ top: 8, bottom: 8, left: 4, right: 4 }}
        style={({ pressed }) => [
          styles.insightsLinkPressable,
          Platform.OS === 'web' && styles.insightsLinkWeb,
          pressed && styles.insightsLinkPressed,
        ]}
      >
        <View style={styles.insightsLinkRow}>
          <Text style={styles.insightsLinkText}>{copy.insightsLink}</Text>
          <Ionicons
            name="chevron-forward"
            size={14}
            color={theme.colors.accent}
            style={styles.insightsLinkIcon}
            accessibilityElementsHidden
            importantForAccessibility="no"
          />
        </View>
      </Pressable>
    </SectionCard>
  );
}

const styles = StyleSheet.create({
  stack: {
    gap: theme.spacing.lg,
  },
  block: {
    gap: theme.spacing.xs,
  },
  label: {
    ...theme.typography.caption,
    fontFamily: 'DMSans_500Medium',
    fontSize: 12,
    letterSpacing: 0.4,
    color: theme.colors.textMuted,
    textTransform: 'uppercase',
  },
  body: {
    ...theme.typography.body,
    color: theme.colors.text,
    lineHeight: 24,
  },
  bodyPlaceholder: {
    ...theme.typography.body,
    color: theme.colors.textMuted,
    lineHeight: 24,
  },
  insightsLinkPressable: {
    alignSelf: 'flex-start',
    marginTop: theme.spacing.lg,
    maxWidth: '100%',
  },
  insightsLinkWeb: {
    cursor: 'pointer' as const,
  },
  insightsLinkPressed: {
    opacity: 0.82,
  },
  insightsLinkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: theme.spacing.xs,
  },
  insightsLinkText: {
    ...theme.typography.caption,
    fontFamily: 'DMSans_500Medium',
    fontSize: 12,
    lineHeight: 18,
    color: theme.colors.accent,
    textDecorationLine: 'underline',
    textDecorationColor: theme.colors.accentMuted,
  },
  insightsLinkIcon: {
    marginTop: 1,
  },
});
