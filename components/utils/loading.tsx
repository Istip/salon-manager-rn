import { Text } from '@/components/ui/text';
import { colors } from '@/lib/colors';
import { Loader } from 'lucide-react-native';
import { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';

interface Props {
  title?: string;
  subtitle?: string;
}

const Loading = ({ title = 'Salon Manager', subtitle = 'Loading in course' }: Props) => {
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
        {title}
      </Text>
      <Text className="text-muted">{subtitle}</Text>
    </View>
  );
};

export default Loading;
