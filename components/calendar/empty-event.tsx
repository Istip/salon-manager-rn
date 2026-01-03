import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Icon } from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { formatDate } from '@/lib/date-functions';
import { useDateStore } from '@/lib/stores/date-store';
import { DoorClosed, PlusCircleIcon, SaveIcon } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

const EmptyEvent = ({ item }: { item: string }) => {
  const selectedDay = useDateStore((state) => state.selectedDay);

  return (
    <View className="w-full flex-row items-center gap-2 py-2">
      <View className="h-full w-16">
        <Text variant="muted" className="text-right">
          {item}
        </Text>
      </View>

      <View className="w-full flex-1">
        <Dialog>
          <DialogTrigger asChild>
            <Pressable className="w-full items-center rounded-lg border border-dashed border-border px-4 py-6 text-center">
              <Icon as={PlusCircleIcon} size={24} className="text-muted" />
            </Pressable>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New appointment</DialogTitle>
              <DialogDescription className="text-center">
                <Text variant="small" className="text-muted">
                  will be added for{' '}
                  <Text variant="small" className="text-primary">
                    {formatDate(selectedDay)}
                  </Text>{' '}
                  at:
                </Text>
              </DialogDescription>
              <Text variant="h1" className="text-center text-primary">
                {item}
              </Text>
            </DialogHeader>

            <View className="grid gap-4">
              <View className="grid gap-3">
                <Input placeholder="Enter the client's name" id="name" />
              </View>
              <View className="grid gap-3">
                <Input placeholder="Enter the name" id="username" />
              </View>
            </View>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">
                  <Icon as={DoorClosed} size={16} className="text-foreground" />
                  <Text>Cancel</Text>
                </Button>
              </DialogClose>
              <Button>
                <Icon as={SaveIcon} size={16} className="text-background" />
                <Text>Save changes</Text>
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </View>
    </View>
  );
};

export default EmptyEvent;
