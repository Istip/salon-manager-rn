import { Button } from '@/components/ui/button';
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Icon } from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { formatDate } from '@/lib/helpers/date-functions';
import { Service } from '@/lib/services/user-service';
import { DoorClosed, SaveIcon } from 'lucide-react-native';
import { FlatList, Pressable, View } from 'react-native';

interface Props {
  item: string;
  selectedDay: Date;
  name: string;
  setName: (name: string) => void;
  action: Service;
  setAction: React.Dispatch<React.SetStateAction<Service>>;
  handleSubmit: () => Promise<void>;
  services: Service[];
}

const EventDialog = ({
  item,
  selectedDay,
  name,
  setName,
  action,
  setAction,
  handleSubmit,
  services,
}: Props) => {
  return (
    <>
      <DialogHeader>
        <DialogTitle asChild>
          <Text variant="h3" className="mt-4 text-center">
            New appointment
          </Text>
        </DialogTitle>
        <DialogDescription className="text-center">
          <Text className="text-muted">
            will be added for{' '}
            <Text variant="large" className="text-primary">
              {formatDate(selectedDay)}
            </Text>{' '}
            at:
          </Text>
        </DialogDescription>
        <Text className="text-center text-6xl font-black text-primary">{item}</Text>
      </DialogHeader>

      <View className="grid gap-4">
        <View className="grid gap-3">
          <Input
            id="name"
            value={name}
            onChangeText={setName}
            placeholder="Enter the client's name"
          />
        </View>
        <View className="grid gap-3">
          <FlatList
            contentContainerStyle={{ gap: 8 }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={services}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <Pressable
                className={`rounded-xl px-2 pb-2 pt-1 ${action.name === item.name ? 'bg-primary' : 'bg-transparent'}`}
                onPress={() => setAction(item)}>
                <Text variant="large">{item.name}</Text>
                <Text variant="small" className="text-center font-extralight">
                  {item.price} LEI
                </Text>
              </Pressable>
            )}
          />
        </View>
      </View>

      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">
            <Icon as={DoorClosed} size={16} className="text-foreground" />
            <Text>Cancel</Text>
          </Button>
        </DialogClose>
        <Button onPress={handleSubmit}>
          <Icon as={SaveIcon} size={16} className="text-background" />
          <Text>Save changes</Text>
        </Button>
      </DialogFooter>
    </>
  );
};

export default EventDialog;
