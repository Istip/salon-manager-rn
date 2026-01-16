import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { PlusCircleIcon } from 'lucide-react-native';
import { View } from 'react-native';

const EventSkeleton = ({ item }: { item: string }) => {
  return (
    <View className="w-full flex-row items-center gap-2 py-2">
      <View className="h-full w-16">
        <Text variant="muted" className="text-right">
          {item}
        </Text>
      </View>

      <View className="w-full flex-1">
        <View className="w-full items-center rounded-lg border border-dashed border-border bg-zinc-100 px-4 py-4 text-center opacity-50 dark:bg-zinc-900">
          <Icon as={PlusCircleIcon} size={24} className="text-muted" />
        </View>
      </View>
    </View>
  );
};

export default EventSkeleton;
