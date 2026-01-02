import Switcher from '@/components/switcher';
import { useColorScheme } from 'nativewind';

const ThemeToggler = () => {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <Switcher value={colorScheme === 'dark'} onValueChange={toggleColorScheme}>
      Use dark mode
    </Switcher>
  );
};

export default ThemeToggler;
