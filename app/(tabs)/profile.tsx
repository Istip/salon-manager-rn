import ProfileAvatar from '@/components/profile/profile-avatar';
import Services from '@/components/profile/services';
import GenderToggler from '@/components/settings/gender-toggler';
import ThemeToggler from '@/components/settings/theme-toggler';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { authService } from '@/lib/services/auth-service';
import { useAuthStore } from '@/lib/stores/auth-store';
import { LogOutIcon } from 'lucide-react-native';
import { Alert, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Profile = () => {
  const { user, logout } = useAuthStore();

  const handleSignOut = async () => {
    try {
      await authService.signOut();
      logout();
    } catch (error: any) {
      console.log(error);
      Alert.alert('Error', 'Failed to sign out');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView
        className="flex-1 px-4"
        contentContainerClassName="flex-grow justify-center"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <View className="flex-1 py-8">
          <View className="mb-8 items-center">
            {user && <ProfileAvatar user={user} />}

            <Text
              variant="h2"
              className="mb-2 mt-4 w-full text-center font-extralight text-muted-foreground">
              Hello
            </Text>
            <Text variant="h1" className="font-black">
              {user?.displayName || 'User'}
            </Text>

            <Text className="mb-8 mt-0 text-muted">{user?.email}</Text>

            <Button variant="destructive" onPress={handleSignOut} className="w-full">
              <Icon as={LogOutIcon} size={16} className="text-destructive-foreground" />
              <Text className="text-destructive-foreground">Sign Out</Text>
            </Button>
          </View>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              <ThemeToggler />
              <GenderToggler className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Services</CardTitle>
              <CardDescription>
                Manage your offered services, add or remove them, adjust its price. Note: you have
                to have at least one active service at a time and each service should have a unique
                name.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Services />
            </CardContent>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
