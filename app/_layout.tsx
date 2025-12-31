import { NAV_THEME } from '@/lib/theme';
import { ThemeProvider } from '@react-navigation/native';
import { PortalHost } from '@rn-primitives/portal';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'nativewind';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import '@/global.css';

export default function RootLayout() {
  const { colorScheme } = useColorScheme();

  return (
    <SafeAreaProvider>
      <ThemeProvider value={NAV_THEME[colorScheme ?? 'light']}>
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
        <Stack>
          <Stack.Screen
            name="(tabs)"
            options={{ title: 'Home', headerShown: false, animation: 'fade' }}
          />
        </Stack>
        <PortalHost />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

export { ErrorBoundary } from 'expo-router';
