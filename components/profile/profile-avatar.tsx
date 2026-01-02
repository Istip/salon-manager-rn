import { Text } from '@/components/ui/text';
import { User } from 'firebase/auth';
import { Image, View } from 'react-native';

const ProfileAvatar = ({ user }: { user: User }) => {
  return (
    <>
      {user?.photoURL ? (
        <View className="mb-4 h-24 w-24 overflow-hidden rounded-full">
          <Image source={{ uri: user.photoURL }} className="h-full w-full" resizeMode="cover" />
        </View>
      ) : (
        <View className="mb-4 h-24 w-24 items-center justify-center rounded-full bg-primary">
          <Text variant="h1" className="text-primary-foreground">
            {user?.displayName?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase()}
          </Text>
        </View>
      )}
    </>
  );
};

export default ProfileAvatar;
