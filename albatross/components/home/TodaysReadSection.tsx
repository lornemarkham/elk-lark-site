import { useEffect, useLayoutEffect, useMemo, useRef } from 'react';
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

const FADE_DELAY_FROM_IDLE_MS = 120;
const FADE_IN_FROM_IDLE_MS = 200;
const CROSSFADE_OUT_MS = 100;
const CROSSFADE_IN_MS = 180;

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
          duration: FADE_IN_FROM_IDLE_MS,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }).start();
      }, FADE_DELAY_FROM_IDLE_MS);
      return () => clearTimeout(t);
    }

    const anim = Animated.sequence([
      Animated.timing(opacity, {
        toValue: 0.52,
        duration: CROSSFADE_OUT_MS,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: CROSSFADE_IN_MS,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]);

    anim.start();

    return () => {
      opacity.stopAnimation();
    };
  }, [atDefaults, contentSignature, opacity]);

  const bodyStyle = atDefaults ? styles.bodyPlaceholder : styles.body;
  const contentOpacity = atDefaults ? 1 : opacity;

  const rows = useMemo(
    () => [
      { key: 'tone', label: 'Tone', text: lines.tone },
      { key: 'focus', label: 'Focus', text: lines.focus },
      { key: 'watch', label: 'Watch out', text: lines.watchOut },
    ],
    [lines.focus, lines.tone, lines.watchOut],
  );

  return (
    <SectionCard
      eyebrow={copy.eyebrow}
      title={copy.title}
      description={atDefaults ? copy.descriptionIdle : copy.description}
    >
      <Animated.View style={{ opacity: contentOpacity }}>
        <View style={styles.stack}>
          {rows.map((row, index) => (
            <View key={row.key}>
              {index > 0 ? <View style={styles.divider} /> : null}
              <View style={styles.block}>
                <Text style={styles.label}>{row.label}</Text>
                <Text style={bodyStyle}>{row.text}</Text>
              </View>
            </View>
          ))}
        </View>
      </Animated.View>

      <Pressable
        onPress={() => router.push('/insights')}
        accessibilityRole="link"
        accessibilityHint="Opens Insights to see your week in context"
        hitSlop={{ top: 8, bottom: 8, left: 4, right: 4 }}
        style={({ pressed }) => [
          styles.insightsLinkPressable,
          Platform.OS === 'web' && styles.insightsLinkWeb,
          pressed && styles.insightsLinkPressed,
        ]}
      >
        <Text style={styles.insightsLinkText}>{copy.insightsLink}</Text>
      </Pressable>
    </SectionCard>
  );
}

const styles = StyleSheet.create({
  stack: {
    gap: 0,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: theme.colors.borderStrong,
    marginVertical: theme.spacing.md,
    alignSelf: 'stretch',
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
    paddingVertical: 10,
    paddingHorizontal: 8,
    marginLeft: -8,
    borderRadius: theme.radii.sm,
  },
  insightsLinkWeb: {
    cursor: 'pointer' as const,
  },
  insightsLinkPressed: {
    opacity: 0.85,
    backgroundColor: theme.colors.accentSoft,
  },
  insightsLinkText: {
    ...theme.typography.caption,
    fontFamily: 'DMSans_500Medium',
    fontSize: 13,
    lineHeight: 20,
    color: theme.colors.dotActive,
    textDecorationLine: 'underline',
    textDecorationColor: theme.colors.accentMuted,
  },
});
