import CalendarNavigator from '@/components/calendar/calendar-navigator';
import { Text } from '@/components/ui/text';
import { formatDate } from '@/lib/date-functions';
import { useDateStore } from '@/lib/stores/date-store';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Calendar() {
  const selectedDay = useDateStore((state) => state.selectedDay);

  return (
    <SafeAreaView>
      <CalendarNavigator />
      <ScrollView>
        <View className="flex-1 items-center justify-center gap-8 px-4">
          <Text variant="h2">Calendar Tab</Text>
          <Text variant="muted">{formatDate(selectedDay)}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
