import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { db } from '@/lib/firebase';
import { CalendarEvent } from '@/lib/hooks/use-calendar-events';
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { CheckCircle, ChevronDown, Trash, Undo2 } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const Event = ({ event, item }: { event: CalendarEvent; item: string }) => {
  const [open, setOpen] = useState(false);
  const [price, setPrice] = useState(event.price.toString());
  const translateX = useSharedValue(0);

  const cardAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const leftActionAnimatedStyle = useAnimatedStyle(() => ({
    width: translateX.value < -20 ? Math.abs(translateX.value) : 0,
    opacity: translateX.value < -20 ? Math.min(Math.abs(translateX.value) / 100, 1) : 0,
  }));

  const rightActionAnimatedStyle = useAnimatedStyle(() => ({
    width: translateX.value > 20 ? translateX.value : 0,
    opacity: translateX.value > 20 ? Math.min(translateX.value / 100, 1) : 0,
  }));

  const handleFinish = async () => {
    try {
      await setDoc(doc(db, 'events', event.id), { ...event, done: !event.done }, { merge: true });
    } catch (error) {
      console.error('Error updating document: ', error);
    }
  };

  const handleRemove = async () => {
    try {
      await deleteDoc(doc(db, 'events', event.id));
    } catch (error) {
      console.error('Error deleting document: ', error);
    }
  };

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const panGesture = Gesture.Pan()
    .activeOffsetX([-20, 20])
    .failOffsetY([-30, 30])
    .onUpdate((e) => {
      translateX.value = e.translationX;
    })
    .onEnd((e) => {
      // Swipe threshold
      const threshold = 120;

      if (e.translationX > threshold) {
        // Right swipe - finish/complete event
        translateX.value = withTiming(0);
        handleFinish();
      } else if (e.translationX < -threshold) {
        // Left swipe - remove event
        translateX.value = withTiming(0);
        handleRemove();
      } else {
        translateX.value = withTiming(0);
      }
    })
    .runOnJS(true);

  useEffect(() => {
    const handleChangePrice = async () => {
      try {
        await setDoc(
          doc(db, 'events', event.id),
          { ...event, price: parseFloat(price) || 0 },
          { merge: true }
        );
      } catch (error) {
        console.error('Error updating document: ', error);
      }
    };

    handleChangePrice();
  }, [price, event]);

  return (
    <View className="w-full flex-row items-center gap-2 py-2">
      <View className="h-full w-16">
        <Text variant="large" className="text-right text-primary">
          {item}
        </Text>
      </View>
      <GestureDetector gesture={panGesture}>
        <View className="relative flex-1">
          <Animated.View
            style={rightActionAnimatedStyle}
            className="absolute bottom-0 left-0 top-0 z-0 flex-row items-center justify-center rounded-lg bg-primary">
            <Icon as={event.done ? Undo2 : CheckCircle} size={16} color="white" />
          </Animated.View>

          <Animated.View
            style={leftActionAnimatedStyle}
            className="absolute bottom-0 right-0 top-0 z-0 flex-row items-center justify-center rounded-lg bg-destructive">
            <Icon as={Trash} size={16} color="white" />
          </Animated.View>

          <Animated.View style={cardAnimatedStyle} className="relative z-10">
            <Pressable
              onLongPress={handleFinish}
              onPress={handleOpen}
              className={`rounded-lg border border-primary px-3 py-3 ${event.done ? 'bg-primary' : 'bg-zinc-100 dark:bg-zinc-900'}`}>
              <View className="flex flex-row items-center justify-between">
                <View className="mr-4 h-10 w-10 items-center justify-center overflow-hidden rounded-2xl bg-card">
                  <Text variant="small" className="text-primary">
                    {event.price}
                  </Text>
                </View>
                <View className="flex-1">
                  <Text
                    variant="large"
                    className={`${event.done ? 'text-background' : 'text-foreground'}`}>
                    {event.name}
                  </Text>
                  <Text
                    variant="small"
                    className={`font-thin leading-5 ${event.done ? 'text-background' : 'text-muted-foreground'}`}>
                    {event.action}
                  </Text>
                </View>
                <Pressable onLongPress={handleFinish} onPress={handleOpen} className="p-3">
                  <View>
                    <Icon as={ChevronDown} size={16} />
                  </View>
                </Pressable>
              </View>
              {open && (
                <View className="mt-4 flex-1 flex-row items-center justify-between gap-2 pb-1">
                  <View>
                    <Button size="sm" variant="destructive" onPress={handleRemove}>
                      <Icon as={Trash} size={16} />
                    </Button>
                  </View>
                  <View className="flex-1">
                    <Input
                      value={price}
                      onChangeText={setPrice}
                      keyboardType="numeric"
                      placeholder="Enter price"
                    />
                  </View>
                  <View>
                    <Button size="sm" variant="secondary" onPress={handleFinish}>
                      <Icon as={CheckCircle} size={16} />
                    </Button>
                  </View>
                </View>
              )}
            </Pressable>
          </Animated.View>
        </View>
      </GestureDetector>
    </View>
  );
};

export default Event;
