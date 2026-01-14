import '@/global.css';
import { useAuthStateObserver } from '@/lib/hooks/use-auth-observer';
import { useAuthStore } from '@/lib/stores/auth-store';
import { NAV_THEME } from '@/lib/theme';
import { ThemeProvider } from '@react-navigation/native';
import { PortalHost } from '@rn-primitives/portal';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'nativewind';
import { useEffect, useRef } from 'react';
import { Appearance } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  const { colorScheme, setColorScheme } = useColorScheme();
  const { userProfile, isLoading } = useAuthStore();
  const themeInitializedRef = useRef(false);

  useAuthStateObserver();

  useEffect(() => {
    if (isLoading) return;

    if (userProfile && !themeInitializedRef.current) {
      if (userProfile.settings?.theme) {
        setColorScheme(userProfile.settings.theme);
      }
      themeInitializedRef.current = true;
    } else if (!userProfile && !themeInitializedRef.current) {
      const systemColorScheme = Appearance.getColorScheme();
      if (systemColorScheme) {
        setColorScheme(systemColorScheme);
      }
      themeInitializedRef.current = true;
    }
  }, [userProfile, isLoading, setColorScheme]);

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
