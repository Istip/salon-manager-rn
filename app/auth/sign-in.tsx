import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { authService } from '@/lib/services/auth-service';
import { useAuthStore } from '@/lib/stores/auth-store';
import { Link, Redirect } from 'expo-router';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SignInScreen() {
  const { isAuthenticated, isLoading: isAuthLoading } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isAuthLoading && isAuthenticated) {
    return <Redirect href="/(tabs)" />;
  }

  const handleSignIn = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      await authService.signIn(email.trim(), password);
      // Navigation will happen automatically via auth state change
    } catch (error: any) {
      Alert.alert('Sign In Error', error.message || 'Failed to sign in');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email address first');
      return;
    }

    try {
      await authService.resetPassword(email.trim());
      Alert.alert('Success', 'Password reset email sent!');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to send reset email');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1">
        <ScrollView
          className="flex-1"
          contentContainerClassName="flex-grow justify-center px-6"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View className="flex-1 justify-center px-6">
            <View className="mb-8">
              <Text variant="h1" className="text-primary">
                Salon Manager
              </Text>
              <Text className="text-center text-muted-foreground">
                Sign back to your own Salon account
              </Text>
            </View>

            <View className="mb-6">
              <View className="pb-4">
                <Text className="mb-2 text-sm font-medium">Email</Text>
                <Input
                  placeholder="Enter your email"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              <View className="pb-2">
                <Text className="mb-2 text-sm font-medium">Password</Text>
                <Input
                  placeholder="Enter your password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  autoCapitalize="none"
                />
              </View>
            </View>

            <Button onPress={handleSignIn} disabled={isLoading} className="mb-4 w-full">
              <Text>{isLoading ? 'Signing In...' : 'Sign In'}</Text>
            </Button>

            <Button variant="ghost" onPress={handleForgotPassword} className="w-full">
              <Text>Forgot Password?</Text>
            </Button>

            <View className="my-8">
              <Text className="text-center text-muted-foreground">
                Don&apos;t have an account?{' '}
                <Link href="/auth/sign-up" asChild>
                  <Text className="font-bold text-primary">Sign Up</Text>
                </Link>
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
