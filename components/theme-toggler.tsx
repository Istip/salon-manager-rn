import Switcher from '@/components/switcher';
import { userService } from '@/lib/services/user-service';
import { useAuthStore } from '@/lib/stores/auth-store';
import { useColorScheme } from 'nativewind';
import { Alert } from 'react-native';

const ThemeToggler = ({ className }: { className?: string }) => {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const { user } = useAuthStore();

  const handleThemeChange = async () => {
    const newTheme = colorScheme === 'dark' ? 'light' : 'dark';

    toggleColorScheme();

    if (user) {
      try {
        await userService.updateTheme(user.uid, newTheme);
      } catch (error) {
        console.error('Failed to update theme:', error);
        Alert.alert('Error', 'Failed to save theme preference');
        toggleColorScheme();
      }
    }
  };

  return (
    <Switcher
      value={colorScheme === 'dark'}
      onValueChange={handleThemeChange}
      className={className}>
      Use dark mode
    </Switcher>
  );
};

export default ThemeToggler;
