import { configureFonts, MD3LightTheme } from 'react-native-paper';
import { Platform } from 'react-native';

const baseFont = {
  fontFamily: Platform.select({
    ios: 'System',
    android: 'Roboto',
    default: 'sans-serif',
  }),
};

export const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#6C5CE7',
    secondary: '#00CEFF',
    background: '#F9F9F9',
    surface: '#FFFFFF',
    error: '#D63031',
  },
  fonts: configureFonts({
    config: {
      displayLarge: baseFont,
      displayMedium: baseFont,
      displaySmall: baseFont,
      headlineLarge: baseFont,
      headlineMedium: baseFont,
      headlineSmall: baseFont,
      titleLarge: baseFont,
      titleMedium: baseFont,
      titleSmall: baseFont,
      bodyLarge: baseFont,
      bodyMedium: baseFont,
      bodySmall: baseFont,
      labelLarge: baseFont,
      labelMedium: baseFont,
      labelSmall: baseFont,
    },
  }),
  roundness: 12,
  animation: {
    scale: 1.0,
  },
};