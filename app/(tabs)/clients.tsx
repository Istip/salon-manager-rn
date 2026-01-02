import ThemeToggler from '@/components/theme-toggler';
import { Text } from '@/components/ui/text';
import { View } from 'react-native';

const Clients = () => {
  return (
    <View className="flex flex-1 items-center justify-center p-4">
      <Text variant="h3">Clients</Text>
      <ThemeToggler />
    </View>
  );
};

export default Clients;
