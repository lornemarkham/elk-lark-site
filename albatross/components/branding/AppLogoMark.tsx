import { Image, type ImageStyle, StyleSheet, View } from 'react-native';

const LOGO_SOURCE = require('../../assets/logo/Albatross_App_Logo_Transparent.png');

/** Default mark size for inline / compact use. */
export const APP_LOGO_MARK_SIZE = 44;

type Props = {
  size?: number;
  style?: ImageStyle;
  /** When nested in a labeled control (e.g. FAB), hide duplicate a11y on the image. */
  decorative?: boolean;
};

export function AppLogoMark({
  size = APP_LOGO_MARK_SIZE,
  style,
  decorative = false,
}: Props) {
  return (
    <View style={[styles.box, { width: size, height: size }]}>
      <Image
        source={LOGO_SOURCE}
        style={[styles.image, { width: size, height: size }, style]}
        resizeMode="contain"
        accessible={!decorative}
        accessibilityLabel={decorative ? undefined : 'Albatross'}
        accessibilityRole="image"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flexShrink: 0,
  },
  image: {
    opacity: 0.96,
  },
});
