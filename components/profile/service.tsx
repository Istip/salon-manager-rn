import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { Service as ServiceType, userService } from '@/lib/services/user-service';
import { useAuthStore } from '@/lib/stores/auth-store';
import { CheckCheck, ChevronRightCircle, SaveIcon, Trash } from 'lucide-react-native';
import { useState } from 'react';
import { View } from 'react-native';

interface Props {
  service: ServiceType;
  disabledRemoval: boolean;
}

const Service = ({ service, disabledRemoval }: Props) => {
  const [remove, setRemove] = useState(false);
  const [isRemoveLoading, setIsRemoveLoading] = useState(false);
  const [isSaveLoading, setIsSaveLoading] = useState(false);
  const [newPrice, setNewPrice] = useState(service.price);

  const user = useAuthStore((state) => state.user);
  const setUserProfile = useAuthStore((state) => state.setUserProfile);

  const handleDoubleCheck = () => {
    setRemove((prev) => !prev);
  };

  const handleCancelRemove = () => {
    setRemove(false);
  };

  const handleRemoveService = async (serviceName: string) => {
    setIsRemoveLoading(true);
    try {
      const { uid } = user!;
      await userService.removeService(uid, serviceName);

      const updatedProfile = await userService.getUser(uid);
      if (updatedProfile) {
        setUserProfile(updatedProfile);
      }
    } catch (error) {
      console.error('Error removing service:', error);
    } finally {
      setIsRemoveLoading(false);
    }
  };

  const handleSavePrice = async () => {
    setIsSaveLoading(true);
    try {
      const { uid } = user!;
      await userService.updateServicePrice(uid, service.name, newPrice);

      // Refresh user profile to reflect the changes
      const updatedProfile = await userService.getUser(uid);
      if (updatedProfile) {
        setUserProfile(updatedProfile);
      }
    } catch (error) {
      console.error('Error updating service price:', error);
    } finally {
      setIsSaveLoading(false);
    }
  };

  return (
    <View className="rounded-2xl bg-accent p-2">
      <Text variant="default" className="mb-2 text-muted-foreground">
        {service.name}
      </Text>
      <View className="flex flex-1 flex-row items-center justify-center gap-2">
        <Input
          keyboardType="numeric"
          value={newPrice}
          onChangeText={setNewPrice}
          className="flex-1"
        />
        {!remove ? (
          <Button variant="destructive" onPress={handleDoubleCheck} disabled={disabledRemoval}>
            <Icon as={Trash} size={16} className="text-foreground" />
          </Button>
        ) : (
          <View className="flex flex-row items-center justify-center gap-2">
            <Button
              variant="destructive"
              onPress={() => handleRemoveService(service.name)}
              disabled={isRemoveLoading}>
              <Icon as={CheckCheck} size={16} className="text-foreground" />
              <Text className="text-foreground">{isRemoveLoading ? 'Removing...' : 'Confirm'}</Text>
            </Button>
            <Button variant="secondary" onPress={handleCancelRemove} disabled={isRemoveLoading}>
              <Icon as={ChevronRightCircle} size={16} className="" />
            </Button>
          </View>
        )}
        {!remove ? (
          <Button disabled={isSaveLoading} onPress={handleSavePrice}>
            <Icon as={SaveIcon} size={16} className="text-foreground" />
            <Text className="text-foreground">Save</Text>
          </Button>
        ) : null}
      </View>
    </View>
  );
};

export default Service;
