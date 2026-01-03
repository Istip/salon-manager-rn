import EmptyEvent from '@/components/calendar/empty-event';
import { timestamps } from '@/lib/date-functions';
import { FlatList } from 'react-native';

const CalendarEvents = () => {
  return (
    <FlatList
      className="px-2"
      data={timestamps}
      renderItem={({ item }) => <EmptyEvent item={item} />}
      keyExtractor={(item, index) => `${item}-${index}`}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default CalendarEvents;
