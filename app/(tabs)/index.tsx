import CalendarEvents from '@/components/calendar/calendar-events';
import CalendarNavigator from '@/components/calendar/calendar-navigator';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Calendar() {
  return (
    <SafeAreaView className="flex-1">
      <CalendarNavigator />
      <CalendarEvents />
    </SafeAreaView>
  );
}
