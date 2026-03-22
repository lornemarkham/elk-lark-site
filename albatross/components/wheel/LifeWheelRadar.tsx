import { useEffect, useMemo, useRef } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedProps,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Svg, {
  Defs,
  G,
  Line,
  LinearGradient,
  Polygon,
  RadialGradient,
  Stop,
  Text as SvgText,
} from 'react-native-svg';

import { theme } from '@/constants/theme';
import type { LifeWheelDimension } from '@/types/wheel';

const AnimatedPolygon = Animated.createAnimatedComponent(Polygon);

/** Fixed viewBox — SVG scales with layout via width/height 100%. */
const VB = 300;
const CX = VB / 2;
const CY = VB / 2;
const MAX_R = 108;
const VALUE_MAX = 10;
const LABEL_R = MAX_R + 18;

const GRADIENT_ID = 'wheelDataFill';
const INNER_HIGHLIGHT_ID = 'wheelInnerHighlight';

const SATURATION_BOOST = 1.16;
/** Slightly stronger fill so the shape reads clearly without going loud. */
const FILL_STOP_OPACITY = 0.33;
/** Grid — ~10–15% darker than prior for clearer structure. */
const GRID_STROKE_INNER = 'rgba(61, 56, 53, 0.098)';
const GRID_STROKE_OUTER = 'rgba(61, 56, 53, 0.158)';
const AXIS_STROKE = 'rgba(61, 56, 53, 0.112)';
const DATA_STROKE_WIDTH = 2.05;

const POLYGON_ANIM_MS = 210;

const LABEL_FILL = 'rgba(86, 80, 76, 0.92)';
const LABEL_FONT_SIZE = 10;
const LABEL_WEIGHT = '500';

type Props = {
  dimensions: LifeWheelDimension[];
  selectedId: string | null;
  onSelectDimension: (id: string | null) => void;
  /** List selection (view) or slider drag (edit) — highlights that segment on the wheel. */
  highlightedSegmentId?: string | null;
};

function pointOnCircle(
  cx: number,
  cy: number,
  radius: number,
  angleRad: number,
) {
  return {
    x: cx + radius * Math.cos(angleRad),
    y: cy + radius * Math.sin(angleRad),
  };
}

function pointOnCircleW(
  cx: number,
  cy: number,
  radius: number,
  angleRad: number,
) {
  'worklet';
  return {
    x: cx + radius * Math.cos(angleRad),
    y: cy + radius * Math.sin(angleRad),
  };
}

function polygonPoints(
  cx: number,
  cy: number,
  radii: number[],
  count: number,
): string {
  const parts: string[] = [];
  for (let i = 0; i < count; i += 1) {
    const angle = -Math.PI / 2 + (2 * Math.PI * i) / count;
    const r = radii[i] ?? 0;
    const { x, y } = pointOnCircle(cx, cy, r, angle);
    parts.push(`${x.toFixed(2)},${y.toFixed(2)}`);
  }
  return parts.join(' ');
}

function polygonPointsW(
  cx: number,
  cy: number,
  radii: number[],
  count: number,
): string {
  'worklet';
  const parts: string[] = [];
  for (let i = 0; i < count; i += 1) {
    const angle = -Math.PI / 2 + (2 * Math.PI * i) / count;
    const r = radii[i] ?? 0;
    const { x, y } = pointOnCircleW(cx, cy, r, angle);
    parts.push(`${x.toFixed(2)},${y.toFixed(2)}`);
  }
  return parts.join(' ');
}

function segmentWedgeAtDataW(
  cx: number,
  cy: number,
  radii: number[],
  n: number,
  i: number,
): string {
  'worklet';
  const angleI = -Math.PI / 2 + (2 * Math.PI * i) / n;
  const angleI1 = -Math.PI / 2 + (2 * Math.PI * ((i + 1) % n)) / n;
  const rI = radii[i] ?? 0;
  const rI1 = radii[(i + 1) % n] ?? 0;
  const p0 = { x: cx, y: cy };
  const p1 = pointOnCircleW(cx, cy, rI, angleI);
  const p2 = pointOnCircleW(cx, cy, rI1, angleI1);
  return `${p0.x.toFixed(2)},${p0.y.toFixed(2)} ${p1.x.toFixed(2)},${p1.y.toFixed(2)} ${p2.x.toFixed(2)},${p2.y.toFixed(2)}`;
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const h = hex.replace('#', '');
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

function rgbToHex(r: number, g: number, b: number): string {
  const c = (n: number) =>
    Math.max(0, Math.min(255, Math.round(n)))
      .toString(16)
      .padStart(2, '0');
  return `#${c(r)}${c(g)}${c(b)}`;
}

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      default:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return { h, s, l };
}

function hslToRgb(h: number, s: number, l: number) {
  let r: number;
  let g: number;
  let b: number;
  if (s === 0) {
    r = g = b = l * 255;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      let tt = t;
      if (tt < 0) tt += 1;
      if (tt > 1) tt -= 1;
      if (tt < 1 / 6) return p + (q - p) * 6 * tt;
      if (tt < 1 / 2) return q;
      if (tt < 2 / 3) return p + (q - p) * (2 / 3 - tt) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3) * 255;
    g = hue2rgb(p, q, h) * 255;
    b = hue2rgb(p, q, h - 1 / 3) * 255;
  }
  return { r, g, b };
}

function saturateHex(hex: string, factor: number): string {
  const { r, g, b } = hexToRgb(hex);
  const { h, s, l } = rgbToHsl(r, g, b);
  const s2 = Math.min(1, s * factor);
  const l2 = Math.min(0.93, l * 1.02 + 0.012);
  const { r: r2, g: g2, b: b2 } = hslToRgb(h, s2, l2);
  return rgbToHex(r2, g2, b2);
}

function averageHex(hexes: string[]): string {
  let r = 0;
  let g = 0;
  let b = 0;
  for (const h of hexes) {
    const x = hexToRgb(h);
    r += x.r;
    g += x.g;
    b += x.b;
  }
  const n = hexes.length;
  return rgbToHex(r / n, g / n, b / n);
}

function darkenHex(hex: string, amount: number): string {
  const { r, g, b } = hexToRgb(hex);
  const f = 1 - amount;
  return rgbToHex(r * f, g * f, b * f);
}

function computeRadii(dimensions: LifeWheelDimension[]): number[] {
  return dimensions.map(
    (d) =>
      Math.max(0, Math.min(VALUE_MAX, d.value)) * (MAX_R / VALUE_MAX) * 0.94,
  );
}

function radiiEqual(a: number[], b: number[]): boolean {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i += 1) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

function sectorWedgePoints(
  cx: number,
  cy: number,
  outerR: number,
  n: number,
  i: number,
): string {
  const angleI = -Math.PI / 2 + (2 * Math.PI * i) / n;
  const angleI1 = -Math.PI / 2 + (2 * Math.PI * ((i + 1) % n)) / n;
  const p0 = { x: cx, y: cy };
  const p1 = pointOnCircle(cx, cy, outerR, angleI);
  const p2 = pointOnCircle(cx, cy, outerR, angleI1);
  return `${p0.x.toFixed(2)},${p0.y.toFixed(2)} ${p1.x.toFixed(2)},${p1.y.toFixed(2)} ${p2.x.toFixed(2)},${p2.y.toFixed(2)}`;
}

export function LifeWheelRadar({
  dimensions,
  selectedId,
  onSelectDimension,
  highlightedSegmentId = null,
}: Props) {
  const n = dimensions.length;

  const highlightIndex = useMemo(() => {
    if (!highlightedSegmentId) return -1;
    const idx = dimensions.findIndex((d) => d.id === highlightedSegmentId);
    return idx >= 0 ? idx : -1;
  }, [dimensions, highlightedSegmentId]);

  const highlightColor = useMemo(() => {
    if (highlightIndex < 0) return null;
    return dimensions[highlightIndex]?.color ?? null;
  }, [dimensions, highlightIndex]);

  const { gridPolygons, axisLines, labels } = useMemo(() => {
    if (n < 3) {
      return {
        gridPolygons: [] as string[],
        axisLines: [] as { x1: number; y1: number; x2: number; y2: number }[],
        labels: [] as { id: string; x: number; y: number; text: string }[],
      };
    }

    const gridPolygons = [0.5, 1].map((t) =>
      polygonPoints(
        CX,
        CY,
        Array.from({ length: n }, () => MAX_R * t),
        n,
      ),
    );

    const axisLines = Array.from({ length: n }, (_, i) => {
      const angle = -Math.PI / 2 + (2 * Math.PI * i) / n;
      const outer = pointOnCircle(CX, CY, MAX_R, angle);
      return { x1: CX, y1: CY, x2: outer.x, y2: outer.y };
    });

    const labels = dimensions.map((d, i) => {
      const angle = -Math.PI / 2 + (2 * Math.PI * i) / n;
      const { x, y } = pointOnCircle(CX, CY, LABEL_R, angle);
      const raw = d.label.trim();
      const short =
        n >= 8 && raw.length > 13 ? `${raw.slice(0, 11)}…` : raw;
      return { id: d.id, x, y, text: short };
    });

    return { gridPolygons, axisLines, labels };
  }, [dimensions, n]);

  const initialRadii = useMemo(() => computeRadii(dimensions), [dimensions]);

  const prevRadiiSV = useSharedValue([...initialRadii]);
  const nextRadiiSV = useSharedValue([...initialRadii]);
  const progress = useSharedValue(1);
  const lastCommittedRadii = useRef<number[]>(computeRadii(dimensions));

  useEffect(() => {
    const next = computeRadii(dimensions);
    if (radiiEqual(lastCommittedRadii.current, next)) {
      return;
    }
    lastCommittedRadii.current = next;
    prevRadiiSV.value = [...nextRadiiSV.value];
    nextRadiiSV.value = next;
    progress.value = 0;
    progress.value = withTiming(1, { duration: POLYGON_ANIM_MS });
  }, [dimensions]);

  const animatedPoints = useDerivedValue(() => {
    const p = progress.value;
    const prev = prevRadiiSV.value;
    const next = nextRadiiSV.value;
    const len = Math.min(prev.length, next.length);
    const blended: number[] = [];
    for (let i = 0; i < len; i += 1) {
      const a = prev[i] ?? 0;
      const b = next[i] ?? 0;
      blended[i] = a + (b - a) * p;
    }
    return polygonPointsW(CX, CY, blended, len);
  });

  const animatedWedgePoints = useDerivedValue(() => {
    if (highlightIndex < 0) {
      return '';
    }
    const p = progress.value;
    const prev = prevRadiiSV.value;
    const next = nextRadiiSV.value;
    const len = Math.min(prev.length, next.length);
    const blended: number[] = [];
    for (let i = 0; i < len; i += 1) {
      const a = prev[i] ?? 0;
      const b = next[i] ?? 0;
      blended[i] = a + (b - a) * p;
    }
    return segmentWedgeAtDataW(CX, CY, blended, len, highlightIndex);
  }, [highlightIndex]);

  const dataPolygonProps = useAnimatedProps(() => ({
    points: animatedPoints.value,
  }));

  const wedgePolygonProps = useAnimatedProps(() => ({
    points: animatedWedgePoints.value,
  }));

  const palette = useMemo(() => {
    const saturated = dimensions.map((d) =>
      saturateHex(d.color, SATURATION_BOOST),
    );
    const blend = averageHex(saturated);
    const strokeHex = darkenHex(blend, 0.21);
    return { saturated, strokeHex };
  }, [dimensions]);

  if (n < 3) {
    return null;
  }

  const gradientStopDen = Math.max(1, n - 1);
  const fillRef = `url(#${GRADIENT_ID})`;
  const highlightRef = `url(#${INNER_HIGHLIGHT_ID})`;
  const outerRingIndex = gridPolygons.length - 1;

  return (
    <View style={styles.wrap}>
      <View style={styles.surface}>
        <View style={styles.chartSlot}>
          <Svg
            width="100%"
            height="100%"
            viewBox={`0 0 ${VB} ${VB}`}
            preserveAspectRatio="xMidYMid meet"
          >
            <Defs>
              <LinearGradient
                id={GRADIENT_ID}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                {dimensions.map((d, i) => (
                  <Stop
                    key={d.id}
                    offset={`${(i / gradientStopDen) * 100}%`}
                    stopColor={palette.saturated[i] ?? d.color}
                    stopOpacity={FILL_STOP_OPACITY}
                  />
                ))}
              </LinearGradient>
              <RadialGradient
                id={INNER_HIGHLIGHT_ID}
                cx="50%"
                cy="50%"
                r="72%"
              >
                <Stop offset="0%" stopColor="#fff6ec" stopOpacity={0.14} />
                <Stop offset="42%" stopColor="#fff6ec" stopOpacity={0.035} />
                <Stop offset="100%" stopColor="#fff6ec" stopOpacity={0} />
              </RadialGradient>
            </Defs>
            {gridPolygons.map((pts, idx) => (
              <Polygon
                key={idx}
                points={pts}
                fill="none"
                stroke={
                  idx === outerRingIndex ? GRID_STROKE_OUTER : GRID_STROKE_INNER
                }
                strokeWidth={idx === outerRingIndex ? 1.08 : 0.85}
              />
            ))}
            {axisLines.map((ln, idx) => (
              <Line
                key={idx}
                x1={ln.x1}
                y1={ln.y1}
                x2={ln.x2}
                y2={ln.y2}
                stroke={AXIS_STROKE}
                strokeWidth={0.85}
              />
            ))}
            {highlightIndex >= 0 && highlightColor ? (
              <AnimatedPolygon
                animatedProps={wedgePolygonProps}
                fill={highlightColor}
                fillOpacity={0.16}
                stroke={highlightColor}
                strokeOpacity={0.38}
                strokeWidth={1.35}
                strokeLinejoin="round"
                pointerEvents="none"
              />
            ) : null}
            <AnimatedPolygon
              animatedProps={dataPolygonProps}
              fill={fillRef}
              stroke={palette.strokeHex}
              strokeWidth={DATA_STROKE_WIDTH}
              strokeLinejoin="round"
              pointerEvents="none"
            />
            <AnimatedPolygon
              animatedProps={dataPolygonProps}
              fill={highlightRef}
              pointerEvents="none"
            />
            {dimensions.map((d, i) => {
              const pts = sectorWedgePoints(CX, CY, MAX_R, n, i);
              const toggle = () =>
                onSelectDimension(selectedId === d.id ? null : d.id);
              return (
                <G
                  key={d.id}
                  accessibilityRole="button"
                  accessibilityLabel={`${d.label}, ${d.value} out of 10. Tap to select or deselect.`}
                  {...(Platform.OS === 'web'
                    ? ({
                        onClick: toggle,
                        onPress: null,
                      } as Record<string, unknown>)
                    : { onPress: toggle })}
                >
                  <Polygon
                    points={pts}
                    fill="#000000"
                    fillOpacity={0.01}
                    stroke="none"
                  />
                </G>
              );
            })}
            {labels.map((lb) => {
              const hasFocus = selectedId !== null;
              const labelOpacity = !hasFocus
                ? 0.8
                : selectedId === lb.id
                  ? 0.96
                  : 0.42;
              return (
                <SvgText
                  key={lb.id}
                  x={lb.x}
                  y={lb.y}
                  fill={LABEL_FILL}
                  fontSize={LABEL_FONT_SIZE}
                  fontWeight={LABEL_WEIGHT}
                  textAnchor="middle"
                  alignmentBaseline="middle"
                  opacity={labelOpacity}
                  pointerEvents="none"
                >
                  {lb.text}
                </SvgText>
              );
            })}
          </Svg>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    alignSelf: 'center',
    marginTop: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },
  surface: {
    width: '100%',
    backgroundColor: 'transparent',
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: 0,
  },
  chartSlot: {
    width: '100%',
    aspectRatio: 1,
    maxWidth: 372,
    alignSelf: 'center',
  },
});
