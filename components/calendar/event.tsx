import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { db } from '@/lib/firebase';
import { CalendarEvent } from '@/lib/hooks/use-calendar-events';
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { CheckCircle, ChevronDown, Trash } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const Event = ({ event, item }: { event: CalendarEvent; item: string }) => {
  const [open, setOpen] = useState(false);
  const [price, setPrice] = useState(event.price.toString());
  const rotation = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
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

  useEffect(() => {
    rotation.value = withTiming(open ? 180 : 0, { duration: 200 });
  }, [open, rotation]);

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
      <View
        className={`flex-1 rounded-lg border border-primary px-4 py-6 ${event.done ? 'bg-primary' : 'bg-muted/20 dark:bg-black/20'}`}>
        <Pressable onLongPress={handleFinish} onPress={handleOpen}>
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
                className={`font-thin leading-5 ${event.done ? 'text-background' : 'text-foreground'}`}>
                {event.action}
              </Text>
            </View>
            <Pressable onLongPress={handleFinish} onPress={handleOpen} className="p-3">
              <Animated.View style={animatedStyle}>
                <Icon as={ChevronDown} size={16} />
              </Animated.View>
            </Pressable>
          </View>
        </Pressable>
        {open && (
          <View className="mt-4 flex-1 flex-row items-center justify-between gap-2">
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
      </View>
    </View>
  );
};

export default Event;
