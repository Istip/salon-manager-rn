import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { db } from '@/lib/firebase';
import { CalendarEvent } from '@/lib/hooks/use-calendar-events';
import { doc, setDoc } from 'firebase/firestore';
import { ChevronDown } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const Event = ({ event, item }: { event: CalendarEvent; item: string }) => {
  const [open, setOpen] = useState(false);
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withTiming(open ? 180 : 0, { duration: 200 });
  }, [open, rotation]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  const handleFinish = () => {
    setDoc(doc(db, 'events', event.id), { ...event, done: !event.done }, { merge: true });
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <View className="w-full flex-row items-center gap-2 py-2">
      <View className="h-full w-16">
        <Text variant="large" className="text-right text-primary">
          {item}
        </Text>
      </View>
      <View
        className={`flex-1 rounded-lg border border-primary px-4 py-6 ${event.done ? 'bg-primary' : 'bg-muted/20 dark:bg-black/20'}`}>
        <Pressable onLongPress={handleFinish} onPress={handleOpen}>
          <View className="flex flex-row items-center justify-between">
            <View className="flex-1">
              <Text
                variant="h4"
                className={`${event.done ? 'text-background' : 'text-foreground'}`}>
                {event.name}
              </Text>
              <Text
                variant="small"
                className={`${event.done ? 'text-background' : 'text-foreground'}`}>
                {event.action}
              </Text>
            </View>
            <Pressable onPress={handleOpen} className="p-3">
              <Animated.View style={animatedStyle}>
                <Icon as={ChevronDown} size={16} />
              </Animated.View>
            </Pressable>
          </View>
        </Pressable>
        {open && (
          <View className="mt-4">
            <Text variant="small" className="text-foreground/70">
              Price: ${event.price}
            </Text>
            <Text variant="small" className="text-foreground/70">
              Late Fee: ${event.late}
            </Text>
            <Text variant="small" className="text-foreground/70">
              Created At: {event.createdAt.toDateString()}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default Event;
