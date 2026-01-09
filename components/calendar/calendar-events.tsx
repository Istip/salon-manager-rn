import EmptyEvent from '@/components/calendar/empty-event';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { timestamps } from '@/lib/date-functions';
import { FlashList } from '@shopify/flash-list';
import { CalendarCheck, CalendarDays, CalendarRange } from 'lucide-react-native';
import { useState } from 'react';
import { View } from 'react-native';

const CalendarEventsHeader = ({
  onFilterChange,
  filter,
}: {
  onFilterChange: (filter: 'all' | 'workingHours' | 'appointments') => void;
  filter: 'all' | 'workingHours' | 'appointments';
}) => {
  return (
    <View className="mb-4 flex flex-row gap-2">
      <Button
        variant={`${filter === 'all' ? 'secondary' : 'ghost'}`}
        className="w-full flex-1"
        onPress={() => onFilterChange('all')}>
        <Icon size="18" as={CalendarDays} />
      </Button>
      <Button
        variant={`${filter === 'workingHours' ? 'secondary' : 'ghost'}`}
        className="w-full flex-1"
        onPress={() => onFilterChange('workingHours')}>
        <Icon size="18" as={CalendarRange} />
      </Button>
      <Button
        variant={`${filter === 'appointments' ? 'secondary' : 'ghost'}`}
        className="w-full flex-1"
        onPress={() => onFilterChange('appointments')}>
        <Icon size="18" as={CalendarCheck} />
      </Button>
    </View>
  );
};

const getFilteredAppointments = (
  filter: 'all' | 'workingHours' | 'appointments',
  times: string[]
) => {
  if (filter === 'all') {
    return times;
  } else if (filter === 'workingHours') {
    return times.filter((time) => {
      const hour = parseInt(time.split(':')[0], 10);
      return hour >= 8 && hour <= 18;
    });
  }
  return [];
};

const CalendarEvents = () => {
  const [filteredAppointments, setFilteredAppointments] = useState<
    'workingHours' | 'all' | 'appointments'
  >('workingHours');

  const displayData = getFilteredAppointments(filteredAppointments, timestamps);

  return (
    <FlashList
      className="px-2"
      data={displayData}
      renderItem={({ item }) => <EmptyEvent item={item} />}
      keyExtractor={(item, index) => `${item}-${index}`}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        <CalendarEventsHeader
          filter={filteredAppointments}
          onFilterChange={setFilteredAppointments}
        />
      }
    />
  );
};

export default CalendarEvents;
