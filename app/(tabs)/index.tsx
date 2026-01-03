import CalendarNavigator from '@/components/calendar/calendar-navigator';
import { Text } from '@/components/ui/text';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Calendar() {
  return (
    <SafeAreaView>
      <CalendarNavigator />
      <ScrollView>
        <View className="flex-1 items-center justify-center gap-8 px-4">
          {Array.from({ length: 20 }).map((_, index) => (
            <Text key={index} className="text-lg">
              Calendar Item {index + 1}
            </Text>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
