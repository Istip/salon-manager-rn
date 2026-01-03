import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { PlusCircleIcon } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

const EmptyEvent = ({ item }: { item: string }) => {
  return (
    <View className="flex-row items-center justify-center gap-2 py-2">
      <View className="h-full w-16">
        <Text variant="muted" className="text-right">
          {item}
        </Text>
      </View>
      <Pressable className="flex-1 items-center rounded-lg border border-dashed border-border px-4 py-6 text-center">
        <Icon as={PlusCircleIcon} size={24} className="text-muted" />
      </Pressable>
    </View>
  );
};

export default EmptyEvent;
