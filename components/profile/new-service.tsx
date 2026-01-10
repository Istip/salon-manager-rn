import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { Service, userService } from '@/lib/services/user-service';
import { useAuthStore } from '@/lib/stores/auth-store';
import { PlusCircle } from 'lucide-react-native';
import React from 'react';
import { Alert, View } from 'react-native';

interface Props {
  services: Service[];
}

const NewService = ({ services }: Props) => {
  const [serviceName, setServiceName] = React.useState('');
  const [servicePrice, setServicePrice] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const user = useAuthStore((state) => state.user);
  const setUserProfile = useAuthStore((state) => state.setUserProfile);

  const handleAddService = async () => {
    setIsLoading(true);
    try {
      const { uid } = user!;

      const name = serviceName.trim().toLowerCase();
      if (!name.length) {
        Alert.alert('Please enter a service name.');
        setIsLoading(false);
        return;
      }

      // Validate service price
      const trimmedPrice = servicePrice.trim();
      if (!trimmedPrice.length) {
        Alert.alert('Please enter a service price.');
        setIsLoading(false);
        return;
      }

      const price = Number(trimmedPrice).toString();
      if (price === 'NaN' || Number(trimmedPrice) < 0) {
        Alert.alert('Please enter a valid price (0 or greater).');
        setIsLoading(false);
        return;
      }

      // Check for duplicate service names
      if (services.some((service) => service.name.toLowerCase() === name)) {
        Alert.alert('Service with this name already exists.');
        setIsLoading(false);
        return;
      }

      await userService.addNewService(uid, { name, price });

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
