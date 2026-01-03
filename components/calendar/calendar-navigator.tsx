import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { daynames, getYearMonth } from '@/lib/date-functions';
import { useDateStore } from '@/lib/stores/date-store';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react-native';
import { useEffect, useRef, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';

const CalendarNavigator = () => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [scrollViewWidth, setScrollViewWidth] = useState(0);
  const today = useDateStore((state) => state.today);

  // Used to select a specific day to show clients' appointments
  const selectedDay = useDateStore((state) => state.selectedDay);
  const setSelectedDay = useDateStore((state) => state.setSelectedDay);

  // Used to navigate between months before selecting any new day
  const selectedDate = useDateStore((state) => state.selectedDate);
  const setSelectedDate = useDateStore((state) => state.setSelectedDate);

  const showBackToToday = selectedDay.toDateString() !== today.toDateString();

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
  }, [selectedDate]);

  return (
    <View className="mb-4 w-full border-b border-secondary bg-accent shadow-2xl">
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
        className="my-2 gap-2"
        contentContainerStyle={{ gap: 8 }}
        onLayout={(event) => setScrollViewWidth(event.nativeEvent.layout.width)}>
        {generateDaysArray().map((day) => {
          const isSelected = day.toDateString() === selectedDay.toDateString();
          const isToday = day.toDateString() === today.toDateString();
          const isWeekend = day.getDay() === 0 || day.getDay() === 6;

          return (
            <Pressable
              key={day.getDate()}
              onPress={() => setSelectedDay(day)}
              className={`w-12 rounded-2xl border p-2 ${isWeekend ? 'bg-card' : 'bg-background'} ${isToday ? 'border-primary' : 'border-transparent'} ${isSelected ? 'bg-primary' : ''}`}>
              <Text
                variant="large"
                className={`text-center ${isSelected ? 'text-foreground' : isWeekend ? 'text-muted' : 'text-foreground'}`}>
                {day.getDate()}
              </Text>
              <Text
                variant="small"
                className={`text-center ${isSelected ? 'text-foreground' : 'text-muted'}`}>
                {daynames[(day.getDay() - 1 + 7) % 7]}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default CalendarNavigator;
