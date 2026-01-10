import Switcher from '@/components/ui/switcher';
import { userService } from '@/lib/services/user-service';
import { useAuthStore } from '@/lib/stores/auth-store';
import { Alert } from 'react-native';

const GenderToggler = ({ className }: { className?: string }) => {
  const { user, userProfile, setUserProfile } = useAuthStore();

  const handleDefaultGenderChange = async (isFemaleDefault: boolean) => {
    if (!user || !userProfile) return;

    try {
      const newGender = isFemaleDefault ? 'female' : 'male';
      await userService.updateDefaultGender(user.uid, newGender);

      const refreshedProfile = await userService.getUser(user.uid);
      if (refreshedProfile) {
        setUserProfile(refreshedProfile);
      }
    } catch (error) {
      console.error('Failed to update default gender', error);
      Alert.alert('Error', 'Failed to save default gender');
    }
  };

  return (
    <Switcher
      value={userProfile?.settings.defaultGender === 'female'}
      onValueChange={handleDefaultGenderChange}
      className={className}>
      Female is default gender
    </Switcher>
  );
};

export default GenderToggler;
