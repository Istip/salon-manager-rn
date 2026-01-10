import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { userService } from '@/lib/services/user-service';
import { useAuthStore } from '@/lib/stores/auth-store';
import { PlusCircle } from 'lucide-react-native';
import React from 'react';
import { View } from 'react-native';

const NewService = () => {
  const [serviceName, setServiceName] = React.useState('');
  const [servicePrice, setServicePrice] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const user = useAuthStore((state) => state.user);
  const setUserProfile = useAuthStore((state) => state.setUserProfile);

  const handleAddService = async () => {
    setIsLoading(true);
    try {
      const { uid } = user!;
      await userService.addNewService(uid, { name: serviceName, price: servicePrice });

      const updatedProfile = await userService.getUser(uid);

      if (updatedProfile) {
        setUserProfile(updatedProfile);
      }

      setServiceName('');
      setServicePrice('');
    } catch (error) {
      console.error('Error adding new service:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="mt-4">
      <View className="gap-2">
        <View>
          <Text variant="muted" className="mb-1 ml-2">
            Name
          </Text>
          <Input placeholder="Type new service" value={serviceName} onChangeText={setServiceName} />
        </View>
        <View>
          <Text variant="muted" className="mb-1 ml-2">
            Price
          </Text>
          <Input
            keyboardType="numeric"
            placeholder="Type new service price"
            value={servicePrice}
            onChangeText={setServicePrice}
          />
        </View>
      </View>
      <Button className="mt-4" onPress={handleAddService} disabled={isLoading}>
        <Icon as={PlusCircle} size={16} className="text-foreground" />
        <Text className="text-foreground">{isLoading ? 'Adding...' : 'Add Service'}</Text>
      </Button>
    </View>
  );
};

export default NewService;
