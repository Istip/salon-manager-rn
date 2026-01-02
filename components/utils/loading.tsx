import { Text } from '@/components/ui/text';
import { colors } from '@/lib/colors';
import { Loader } from 'lucide-react-native';
import { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';

const Loading = () => {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      })
    ).start();
  }, [spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View className="flex-1 items-center justify-center bg-background">
      <Animated.View
        style={{
          transform: [{ rotate: spin }],
        }}
        className="mb-4">
        <Loader size={48} color={colors.primary} strokeWidth={2} />
      </Animated.View>
      <Text variant="h1" className="text-foreground">
        Salon Manager
      </Text>
      <Text className="text-muted">Loading in course</Text>
    </View>
  );
};

export default Loading;
