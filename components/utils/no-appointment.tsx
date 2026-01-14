import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { CalendarX2Icon } from 'lucide-react-native';
import { View } from 'react-native';

const NoAppointment = () => {
  return (
    <View className="flex items-center justify-center py-10">
      <View className="mb-4 overflow-hidden rounded-2xl border border-primary bg-transparent">
        <View className="animate-pulse overflow-hidden bg-primary p-6">
          <Icon as={CalendarX2Icon} size={24} className="text-foreground" />
        </View>
      </View>
      <Text variant="h3" className="text-center text-muted-foreground">
        No appointments
      </Text>
      <Text variant="h4" className="text-center font-light text-muted">
        for today
      </Text>
    </View>
  );
};

export default NoAppointment;
