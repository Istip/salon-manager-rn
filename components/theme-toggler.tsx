import Switcher from '@/components/switcher';
import { useColorScheme } from 'nativewind';

const ThemeToggler = ({ className }: { className?: string }) => {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <Switcher
      value={colorScheme === 'dark'}
      onValueChange={toggleColorScheme}
      className={className}>
      Use dark mode
    </Switcher>
  );
};

export default ThemeToggler;
