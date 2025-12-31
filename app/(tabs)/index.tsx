import { Text } from '@/components/ui/text';
import { useState } from 'react';
import { Switch, View } from 'react-native';

export default function Screen() {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  return (
    <>
      <View className="flex-1 items-center justify-center gap-8 p-4">
        <Text>HOME SCREEN</Text>
        <View className="flex w-full flex-row items-center justify-between">
          <Text>{isEnabled ? 'Switch is ON' : 'Switch is OFF'}</Text>
          <Switch onValueChange={toggleSwitch} value={isEnabled} />
        </View>
      </View>
    </>
  );
}
