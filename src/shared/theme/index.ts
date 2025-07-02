import { MD3LightTheme as DefaultTheme } from 'react-native-paper';

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#FF6B35', 
    primaryContainer: '#FFE8E0',
    secondary: '#8B4513',
    secondaryContainer: '#F4E6D7',
    tertiary: '#2E8B57', 
    surface: '#FFFFFF',
    surfaceVariant: '#F5F5F5',
    background: '#FEFEFE',
    error: '#D32F2F',
    onPrimary: '#FFFFFF',
    onSecondary: '#FFFFFF',
    onSurface: '#1C1B1F',
    onBackground: '#1C1B1F',
    outline: '#E0E0E0',
  },
  fonts: {
    ...DefaultTheme.fonts,
    headlineLarge: {
      ...DefaultTheme.fonts.headlineLarge,
      fontWeight: '700' as const,
    },
    titleLarge: {
      ...DefaultTheme.fonts.titleLarge,
      fontWeight: '600' as const,
    },
  },
};