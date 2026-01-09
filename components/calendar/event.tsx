import { Text } from '@/components/ui/text';
import React from 'react';
import { View } from 'react-native';

const Event = ({ event, item }: { event: { name: string; action: string }; item: string }) => {
  return (
    <View className="w-full flex-row items-center gap-2 py-2">
      <View className="h-full w-16">
        <Text variant="large" className="text-right text-primary">
          {item}
        </Text>
      </View>
      <View className="w-full flex-1 rounded-lg bg-primary/10 px-4 py-6">
        <Text variant="h4" className="text-foreground">
          {event.name}
        </Text>
        <Text variant="small" className="text-muted">
          {event.action}
        </Text>
      </View>
    </View>
  );
};

export default Event;
