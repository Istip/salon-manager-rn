import EmptyEvent from '@/components/calendar/empty-event';
import Event from '@/components/calendar/event';
import EventSkeleton from '@/components/calendar/event-skeleton';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import NoAppointment from '@/components/utils/no-appointment';
import { timestamps } from '@/lib/helpers/date-functions';
import { useCalendarEvents } from '@/lib/hooks/use-calendar-events';
import { useDateStore } from '@/lib/stores/date-store';
import { FlashList } from '@shopify/flash-list';
import { CalendarCheck, CalendarDays, CalendarRange, CheckCircle2 } from 'lucide-react-native';
import { useRef, useState } from 'react';
import { View } from 'react-native';

const EventsHeader = ({
  onFilterChange,
  filter,
  getAllEventsPrice,
  getDoneEventsPrice,
  noEvents,
}: {
  onFilterChange: (filter: 'all' | 'workingHours' | 'appointments') => void;
  filter: 'all' | 'workingHours' | 'appointments';
  getAllEventsPrice: () => number;
  getDoneEventsPrice: () => number;
  noEvents: () => boolean;
}) => {
  const allDone = getDoneEventsPrice() === getAllEventsPrice();

  return (
    <View className="flex gap-2 pb-2 pt-3">
      <View className="flex flex-row gap-2">
        <Button
          variant={`${filter === 'all' ? 'outline' : 'ghost'}`}
          className="w-full flex-1"
          onPress={() => onFilterChange('all')}>
          <Icon size="18" as={CalendarDays} />
          <Text variant="small">All</Text>
        </Button>
        <Button
          variant={`${filter === 'workingHours' ? 'outline' : 'ghost'}`}
          className="w-full flex-1"
          onPress={() => onFilterChange('workingHours')}>
          <Icon size="18" as={CalendarRange} />
          <Text variant="small">Work</Text>
        </Button>
        <Button
          variant={`${filter === 'appointments' ? 'outline' : 'ghost'}`}
          className="w-full flex-1"
          onPress={() => onFilterChange('appointments')}>
          <Icon size="18" as={CalendarCheck} />
          <Text variant="small">Events</Text>
        </Button>
      </View>
      {!noEvents() && (
        <View className="flex flex-row items-center justify-center gap-2 rounded-xl px-2 py-1">
          <View className="h-[1] flex-1 bg-primary" />
          {allDone && (
            <View>
              <Icon as={CheckCircle2} className="text-primary" />
            </View>
          )}
          <Text variant="small">
            Daily income:{' '}
            <Text
              variant="small"
              className={`${!allDone ? 'text-muted-foreground' : 'text-primary'}`}>
              {getDoneEventsPrice()}
            </Text>{' '}
            /{' '}
            <Text
              variant="small"
              className={`${!allDone ? 'text-muted-foreground' : 'text-primary'}`}>
              {getAllEventsPrice()} LEI
            </Text>
          </Text>
          <View className="h-[1] flex-1 bg-primary" />
        </View>
      )}
    </View>
  );
};

const getFilteredAppointments = (
  filter: 'all' | 'workingHours' | 'appointments',
  times: string[],
  events: Record<string, any>
) => {
  if (filter === 'all') {
    return times;
  } else if (filter === 'workingHours') {
    return times.filter((time) => {
      const hour = parseInt(time.split(':')[0], 10);
      return hour >= 8 && hour <= 18;
    });
  } else if (filter === 'appointments') {
    return times.filter((time) => events[time] !== undefined);
  }
  return [];
};

const Events = () => {
  const [filteredAppointments, setFilteredAppointments] = useState<
    'workingHours' | 'all' | 'appointments'
  >('workingHours');
  const { events, loading } = useCalendarEvents();
  const selectedDay = useDateStore((state) => state.selectedDay);
  const flashListRef = useRef<any>(null);

  const handleFilterChange = (filter: 'all' | 'workingHours' | 'appointments') => {
    setFilteredAppointments(filter);
    // Scroll to top when filter changes
    setTimeout(() => {
      flashListRef.current?.scrollToIndex({ index: 0, animated: true });
    }, 10);
  };

  const noEvents = () => {
    return Object.keys(events).length === 0;
  };

  const getAllEventsPrice = () => {
    let total = 0;
    Object.values(events).forEach((event) => {
      total += event.price || 0;
    });
    return total;
  };

  const getDoneEventsPrice = () => {
    let total = 0;
    Object.values(events).forEach((event) => {
      if (event.done) {
        total += event.price || 0;
      }
    });
    return total;
  };

  const displayData = getFilteredAppointments(filteredAppointments, timestamps, events);

  const renderCard = (item: string) => {
    const event = events[item];

    if (loading) {
      return <EventSkeleton item={item} />;
    }

    if (event) {
      return <Event event={event} item={item} />;
    }

    return <EmptyEvent item={item} />;
  };

  return (
    <View className="flex-1">
      <EventsHeader
        noEvents={noEvents}
        filter={filteredAppointments}
        onFilterChange={handleFilterChange}
        getAllEventsPrice={getAllEventsPrice}
        getDoneEventsPrice={getDoneEventsPrice}
      />
      <FlashList
        ref={flashListRef}
        className="flex-1 px-2"
        data={displayData}
        renderItem={({ item }) => renderCard(item)}
        keyExtractor={(item) => `${selectedDay.toDateString()}-${item}`}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={filteredAppointments === 'appointments' ? <NoAppointment /> : null}
      />
    </View>
  );
};

export default Events;
