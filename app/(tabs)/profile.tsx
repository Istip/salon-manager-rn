import ThemeToggler from '@/components/theme-toggler';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { authService } from '@/lib/services/auth-service';
import { useAuthStore } from '@/lib/stores/auth-store';
import { Alert, Image, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Profile = () => {
  const { user, logout } = useAuthStore();

  const handleSignOut = async () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: async () => {
          try {
            await authService.signOut();
            logout();
          } catch (error: any) {
            console.log(error);
            Alert.alert('Error', 'Failed to sign out');
          }
        },
      },
    ]);
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
            {user?.photoURL ? (
              <View className="mb-4 h-24 w-24 overflow-hidden rounded-full">
                <Image
                  source={{ uri: user.photoURL }}
                  className="h-full w-full"
                  resizeMode="cover"
                />
              </View>
            ) : (
              <View className="mb-4 h-24 w-24 items-center justify-center rounded-full bg-primary">
                <Text variant="h1" className="text-primary-foreground">
                  {user?.displayName?.charAt(0)?.toUpperCase() ||
                    user?.email?.charAt(0)?.toUpperCase()}
                </Text>
              </View>
            )}

            <Text variant="h3" className="mb-2">
              {user?.displayName || 'User'}
            </Text>

            <Text className="mb-2 text-muted-foreground">{user?.email}</Text>

            <Button variant="destructive" onPress={handleSignOut} className="w-full">
              <Text className="text-destructive-foreground">Sign Out</Text>
            </Button>
          </View>

          <ThemeToggler />

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
            </CardHeader>
            <CardContent>
              <Text>
                <Text className="font-bold">Email:</Text> {user?.email}
              </Text>
              <Text>
                <Text className="font-bold">Name:</Text> {user?.displayName || 'Not set'}
              </Text>
              <Text>
                <Text className="font-bold">Created:</Text>{' '}
                {user?.metadata?.creationTime
                  ? new Date(user.metadata.creationTime).toLocaleDateString()
                  : 'Unknown'}
              </Text>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
            </CardHeader>
            <CardContent></CardContent>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
