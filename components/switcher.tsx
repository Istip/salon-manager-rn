import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { Switch, View } from 'react-native';

interface Props {
  children: React.ReactNode;
  value: boolean;
  onValueChange: (newValue: boolean) => void;
  className?: string;
}

const Switcher = ({ children, value, onValueChange, className }: Props) => {
  return (
    <View
      className={cn(
        'w-full flex-row items-center justify-between gap-2 rounded-2xl bg-accent px-4 py-1',
        className
      )}>
      <Text>{children}</Text>
      <Switch value={value} onValueChange={onValueChange} />
    </View>
  );
};

export default Switcher;
