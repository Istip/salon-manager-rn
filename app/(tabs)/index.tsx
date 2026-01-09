import CalendarNavigator from '@/components/calendar/calendar-navigator';
import Events from '@/components/calendar/events';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Calendar() {
  return (
    <SafeAreaView className="flex-1">
      <CalendarNavigator />
      <Events />
    </SafeAreaView>
  );
}
