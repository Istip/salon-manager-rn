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
import { db } from '@/lib/firebase';
import { useAuthStore } from '@/lib/stores/auth-store';
import { useDateStore } from '@/lib/stores/date-store';
import { addDoc, collection } from 'firebase/firestore';
import { DoorClosed, PlusCircleIcon, SaveIcon } from 'lucide-react-native';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, View } from 'react-native';

const EmptyEvent = ({ item }: { item: string }) => {
  const [name, setName] = useState('');
  const [action, setAction] = useState('');
  const [open, setOpen] = useState(false);

  const selectedDay = useDateStore((state) => state.selectedDay);
  const user = useAuthStore((state) => state.user);
  const { uid } = user!;

  const handleSubmit = async () => {
    const data = {
      name,
      action,
      createdAt: new Date(),
      date: selectedDay,
      time: item,
      uid,
      done: false,
      price: 0,
      late: 0,
    };

    try {
      await addDoc(collection(db, 'events'), data);

      setName('');
      setAction('');
      setOpen(false);
    } catch (error) {
      console.error('Error saving event:', error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1">
      <View className="w-full flex-row items-center gap-2 py-2">
        <View className="h-full w-16">
          <Text variant="muted" className="text-right">
            {item}
          </Text>
        </View>

        <View className="w-full flex-1">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Pressable className="w-full items-center rounded-lg border border-dashed border-border bg-muted/20 px-4 py-6 text-center dark:bg-black/20">
                <Icon as={PlusCircleIcon} size={24} className="text-muted" />
              </Pressable>
            </DialogTrigger>

            <DialogContent>
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
                  <Input
                    id="action"
                    value={action}
                    onChangeText={setAction}
                    placeholder="What is gonna happen?"
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
            </DialogContent>
          </Dialog>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default EmptyEvent;
