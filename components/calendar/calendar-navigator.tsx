import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { daynames, getYearMonth } from '@/lib/date-functions';
import { useDateStore } from '@/lib/stores/date-store';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react-native';
import { useEffect, useRef } from 'react';
import { Pressable, ScrollView, View } from 'react-native';

const CalendarNavigator = () => {
  const scrollViewRef = useRef<ScrollView>(null);
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

  const groupDaysByWeek = () => {
    const days = generateDaysArray();
    const weeks: Date[][] = [];
    let currentWeek: Date[] = [];

    days.forEach((day) => {
      currentWeek.push(day);
      if (day.getDay() === 0) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    });

    if (currentWeek.length > 0) {
      weeks.push(currentWeek);
    }

    return weeks;
  };

  const backToToday = () => {
    setSelectedDay(today);
    setSelectedDate(today);
  };

  const scrollToToday = () => {
    const weeks = groupDaysByWeek();
    let targetWeekIndex = -1;

    // Check if today is in the current month
    const todayWeekIndex = weeks.findIndex((week) =>
      week.some((day) => day.toDateString() === today.toDateString())
    );

    if (todayWeekIndex !== -1) {
      // Today is in this month, scroll to today
      targetWeekIndex = todayWeekIndex;
    } else {
      // Today is not in this month, scroll to the first day of the month
      targetWeekIndex = 0;
    }

    if (targetWeekIndex !== -1) {
      const weekWidth = 200;
      const gap = 8;
      const xOffset = targetWeekIndex * (weekWidth + gap);
      scrollViewRef.current?.scrollTo({ x: xOffset, animated: true });
    }
  };

  useEffect(() => {
    const timer = setTimeout(scrollToToday, 100);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate]);

  return (
    <View className="my-2 mb-4 w-full border-b border-secondary bg-accent shadow-2xl">
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
        className="my-2"
        contentContainerStyle={{ gap: 8 }}>
        {groupDaysByWeek().map((week, weekIndex) => (
          <View key={weekIndex} className="flex flex-row border border-background">
            {week.map((day) => {
              const isSelected = day.toDateString() === selectedDay.toDateString();
              const isToday = day.toDateString() === today.toDateString();

              return (
                <Pressable
                  key={day.getDate()}
                  onPress={() => setSelectedDay(day)}
                  className={`flex w-12 flex-col items-center justify-center p-2 ${
                    isSelected ? 'bg-primary' : 'bg-card'
                  } ${isToday ? 'text-primary' : ''}`}>
                  <Text
                    variant="large"
                    className={`${isToday ? 'text-primary' : ''} ${isSelected ? 'text-foreground' : ''}`}>
                    {day.getDate()}
                  </Text>
                  <Text
                    variant="small"
                    className={`text-muted ${isToday ? 'text-primary' : ''} ${isSelected ? 'text-foreground' : ''}`}>
                    {daynames[(day.getDay() - 1 + 7) % 7]}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default CalendarNavigator;
