import { Text } from '@/components/ui/text';
import { colors } from '@/lib/colors';
import { cn } from '@/lib/utils';
import { useColorScheme } from 'nativewind';
import { Switch, View } from 'react-native';

interface Props {
  children: React.ReactNode;
  value: boolean;
  onValueChange: (newValue: boolean) => void;
  className?: string;
}

const Switcher = ({ children, value, onValueChange, className }: Props) => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View
      className={cn(
        'w-full flex-row items-center justify-between gap-2 rounded-lg bg-accent px-4 py-1',
        className
      )}>
      <Text className="flex-1 shrink">{children}</Text>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: colors.switchTrackInactive, true: colors.primary }}
        thumbColor={isDark ? colors.switchThumbDark : colors.switchThumbLight}
      />
    </View>
  );
};

export default Switcher;
