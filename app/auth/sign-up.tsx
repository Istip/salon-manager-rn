import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { authService } from '@/lib/services/auth-service';
import { useAuthStore } from '@/lib/stores/auth-store';
import { Link, Redirect } from 'expo-router';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SignUpScreen() {
  const { isAuthenticated, isLoading: isAuthLoading } = useAuthStore();
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isAuthLoading && isAuthenticated) {
    return <Redirect href="/(tabs)" />;
  }

  const handleSignUp = async () => {
    if (!displayName.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 8) {
      Alert.alert('Error', 'Password must be at least 8 characters long');
      return;
    }

    setIsLoading(true);
    try {
      await authService.signUp({
        email: email.trim(),
        password,
        displayName: displayName.trim(),
      });
    } catch (error: any) {
      Alert.alert('Sign Up Error', error.message || 'Failed to create account');
    } finally {
      setIsLoading(false);
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
          <View className="mb-8">
            <Text variant="h1" className="text-primary">
              Salon Manager
            </Text>
            <Text className="text-center text-muted-foreground">Join us to manage your Salon</Text>
          </View>

          <View className="mb-6">
            <View className="pb-4">
              <Text className="mb-2 text-sm font-medium">Full Name</Text>
              <Input
                placeholder="Enter your full name"
                value={displayName}
                onChangeText={setDisplayName}
                autoCapitalize="words"
              />
            </View>

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

            <View className="pb-4">
              <Text className="mb-2 text-sm font-medium">Password</Text>
              <Input
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
              />
            </View>

            <View className="pb-4">
              <Text className="mb-2 text-sm font-medium">Confirm Password</Text>
              <Input
                placeholder="Confirm your password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                autoCapitalize="none"
              />
            </View>
          </View>

          <Button onPress={handleSignUp} disabled={isLoading} className="mb-6 w-full">
            <Text>{isLoading ? 'Creating Account...' : 'Create Account'}</Text>
          </Button>

          <View className="my-8">
            <Text className="text-center text-muted-foreground">
              Already have an account?{' '}
              <Link href="/auth/sign-in" asChild>
                <Text className="font-bold text-primary">Sign In</Text>
              </Link>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
