import { useAuthStateObserver } from '@/lib/hooks/use-auth-observer';
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

  useAuthStateObserver();

  return (
    <SafeAreaProvider>
      <ThemeProvider value={NAV_THEME[colorScheme ?? 'light']}>
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
        <Stack>
          <Stack.Screen
            name="(tabs)"
            options={{ title: 'Home', headerShown: false, animation: 'fade_from_bottom' }}
          />
          <Stack.Screen
            name="auth/sign-in"
            options={{
              title: 'Sign In',
              headerShown: false,
              presentation: 'card',
              animation: 'fade_from_bottom',
            }}
          />
          <Stack.Screen
            name="auth/sign-up"
            options={{
              title: 'Sign Up',
              headerShown: false,
              presentation: 'card',
              animation: 'fade_from_bottom',
            }}
          />
        </Stack>
        <PortalHost />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

export { ErrorBoundary } from 'expo-router';
