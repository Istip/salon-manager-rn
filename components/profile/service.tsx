import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { Service as ServiceType } from '@/lib/services/user-service';
import { CheckCheck, ChevronRightCircle, SaveIcon, Trash } from 'lucide-react-native';
import { useState } from 'react';
import { View } from 'react-native';

interface Props {
  service: ServiceType;
  disabledRemoval: boolean;
}

const Service = ({ service, disabledRemoval }: Props) => {
  const [remove, setRemove] = useState(false);

  const handleDoubleCheck = () => {
    setRemove((prev) => !prev);
  };

  const handleCancelRemove = () => {
    setRemove(false);
  };

  return (
    <View className="rounded-2xl bg-accent p-2">
      <Text variant="default" className="mb-2 text-muted-foreground">
        {service.name.toLowerCase()}
      </Text>
      <View className="flex flex-1 flex-row items-center justify-center gap-2">
        <Input keyboardType="numeric" defaultValue={service.price} className="flex-1" />
        {!remove ? (
          <Button variant="destructive" onPress={handleDoubleCheck} disabled={disabledRemoval}>
            <Icon as={Trash} size={16} className="text-foreground" />
          </Button>
        ) : (
          <View className="flex flex-row items-center justify-center gap-2">
            <Button variant="destructive">
              <Icon as={CheckCheck} size={16} className="text-foreground" />
              <Text className="text-foreground">Confirm</Text>
            </Button>
            <Button variant="secondary" onPress={handleCancelRemove}>
              <Icon as={ChevronRightCircle} size={16} className="" />
            </Button>
          </View>
        )}
        {!remove ? (
          <Button>
            <Icon as={SaveIcon} size={16} className="text-foreground" />
            <Text className="text-foreground">Save</Text>
          </Button>
        ) : null}
      </View>
    </View>
  );
};

export default Service;
