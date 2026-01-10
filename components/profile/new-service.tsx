import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { PlusCircle } from 'lucide-react-native';
import React from 'react';
import { View } from 'react-native';

const NewService = () => {
  const [serviceName, setServiceName] = React.useState('');
  const [servicePrice, setServicePrice] = React.useState('');

  // Handle adding new service (functionality to be implemented)
  const handleAddService = () => {
    try {
      // Logic to add the new service
      console.log('Adding new service:', serviceName, servicePrice);
      // Reset input fields after adding
      setServiceName('');
      setServicePrice('');
    } catch (error) {
      console.error('Error adding new service:', error);
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
      <Button className="mt-4" onPress={handleAddService}>
        <Icon as={PlusCircle} size={16} className="text-foreground" />
        <Text className="text-foreground">Add Service</Text>
      </Button>
    </View>
  );
};

export default NewService;
