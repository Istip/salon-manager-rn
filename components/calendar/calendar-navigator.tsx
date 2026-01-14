import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { db } from '@/lib/firebase';
import { daynames, getYearMonth } from '@/lib/helpers/date-functions';
import { useAuthStore } from '@/lib/stores/auth-store';
import { useDateStore } from '@/lib/stores/date-store';
import { collection, onSnapshot, query, Timestamp, where } from 'firebase/firestore';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react-native';
import { useEffect, useRef, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';

const CalendarNavigator = () => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [scrollViewWidth, setScrollViewWidth] = useState(0);
  const [eventCounts, setEventCounts] = useState<Record<string, number>>({});
  const unsubscribeRef = useRef<(() => void) | null>(null);

  const user = useAuthStore((state) => state.user);
  const today = useDateStore((state) => state.today);
  const selectedDay = useDateStore((state) => state.selectedDay);
  const setSelectedDay = useDateStore((state) => state.setSelectedDay);
  const selectedDate = useDateStore((state) => state.selectedDate);
  const setSelectedDate = useDateStore((state) => state.setSelectedDate);

  const showBackToToday = selectedDay.toDateString() !== today.toDateString();

  // Set up real-time listener for next 7 days
  // NOTE: This is experimental feature, need to be monitored
  useEffect(() => {
    if (!user?.uid) return;

    // Calculate date range: today to 7 days from now
    const startDate = new Date(today);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(today);
    endDate.setDate(endDate.getDate() + 6);
    endDate.setHours(23, 59, 59, 999);

    const q = query(
      collection(db, 'events'),
      where('uid', '==', user.uid),
      where('date', '>=', Timestamp.fromDate(startDate)),
      where('date', '<=', Timestamp.fromDate(endDate))
    );

    unsubscribeRef.current = onSnapshot(q, (snapshot) => {
      const counts: Record<string, number> = {};

      snapshot.docs.forEach((doc) => {
        const eventDate = doc.data().date.toDate();
        const dateKey = eventDate.toISOString().split('T')[0];

        counts[dateKey] = (counts[dateKey] || 0) + 1;
      });

      setEventCounts(counts);
    });

    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
      }
    };
  }, [today, user?.uid]);

  // Helper to get event count for a specific day
  const getCountForDay = (day: Date): number => {
    const dateKey = day.toISOString().split('T')[0];
    return eventCounts[dateKey] || 0;
  };

  const selectPreviousMonth = () => {
    const prevMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1);
    setSelectedDate(prevMonth);
  };

  const selectNextMonth = () => {
    const nextMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1);
    setSelectedDate(nextMonth);
  };

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const generateDaysArray = () => {
    const daysInMonth = getDaysInMonth(selectedDate);
    const days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), i));
    }
    return days;
  };

  const backToToday = () => {
    setSelectedDay(today);
    setSelectedDate(today);
    scrollToToday();
  };

  const scrollToToday = () => {
    const days = generateDaysArray();
    const todayIndex = days.findIndex((day) => day.toDateString() === today.toDateString());

    if (todayIndex !== -1) {
      const dayWidth = 60;
      const gap = 8;
      const itemOffset = todayIndex * (dayWidth + gap);
      const centerOffset = itemOffset - (scrollViewWidth - dayWidth) / 2;
      scrollViewRef.current?.scrollTo({ x: centerOffset, animated: true });
    }
  };

  useEffect(() => {
    scrollToToday();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate, scrollViewWidth]);

  return (
    <View className="w-full border-b border-secondary bg-accent shadow-2xl">
      <View className="flex flex-row items-center justify-between p-2">
        <Button variant="secondary" onPress={selectPreviousMonth}>
          <Icon as={ChevronLeft} size="12" />
        </Button>

        <View className="flex-row items-center justify-center gap-2">
          <Text variant="large">{getYearMonth(selectedDate)}</Text>
          {showBackToToday && (
            <Button onPress={backToToday} className="h-8">
              <Icon as={Clock} size="8" className="text-background" />
              <Text className="text-[8px] text-background">Today</Text>
            </Button>
          )}
        </View>

        <Button variant="secondary" onPress={selectNextMonth}>
          <Icon as={ChevronRight} size="12" />
        </Button>
      </View>

      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 8, paddingHorizontal: 8 }}
        className="my-2"
        onLayout={(event) => setScrollViewWidth(event.nativeEvent.layout.width)}>
        {generateDaysArray().map((day) => {
          const isSelected = day.toDateString() === selectedDay.toDateString();
          const isToday = day.toDateString() === today.toDateString();
          const isWeekend = day.getDay() === 0 || day.getDay() === 6;
          const count = getCountForDay(day);

          return (
            <View key={day.getDate()}>
              <Pressable
                onPress={() => setSelectedDay(day)}
                className={`w-12 rounded-2xl border p-2 ${isWeekend ? 'bg-card' : 'bg-background'} ${isToday ? 'border-primary' : 'border-transparent'} ${isSelected ? 'bg-primary' : ''}`}>
                <Text
                  variant="h4"
                  className={`text-center ${isSelected ? 'text-foreground' : isWeekend ? 'text-muted' : 'text-foreground'}`}>
                  {day.getDate()}
                </Text>
                <Text
                  variant="small"
                  className={`text-center ${isSelected ? 'text-foreground' : 'text-muted'}`}>
                  {daynames[(day.getDay() - 1 + 7) % 7]}
                </Text>
              </Pressable>
              {count > 0 && (
                <View className="flex items-center pt-1 text-center">
                  <Text className="rounded-full bg-primary px-2 py-1 text-[8px] text-primary-foreground">
                    {count}
                  </Text>
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default CalendarNavigator;
