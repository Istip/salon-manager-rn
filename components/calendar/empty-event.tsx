import EventDialog from '@/components/calendar/event-dialog';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { db } from '@/lib/firebase';
import { useAuthStore } from '@/lib/stores/auth-store';
import { useDateStore } from '@/lib/stores/date-store';
import { addDoc, collection } from 'firebase/firestore';
import { PlusCircleIcon } from 'lucide-react-native';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Pressable, View } from 'react-native';

const EmptyEvent = ({ item }: { item: string }) => {
  const user = useAuthStore((state) => state.user);
  const userProfile = useAuthStore((state) => state.userProfile);
  const services = userProfile?.services || [];
  const selectedDay = useDateStore((state) => state.selectedDay);

  const [name, setName] = useState('');
  const [action, setAction] = useState(services[0] || { name: '', price: '' });
  const [open, setOpen] = useState(false);

  const { uid } = user!;

  const handleSubmit = async () => {
    if (!name) {
      Alert.alert('Name error', 'Please enter a name for your appointment.');
      return;
    }

    const data = {
      name,
      action: action.name,
      createdAt: new Date(),
      date: selectedDay,
      time: item,
      uid,
      done: false,
      price: parseFloat(action.price) || 0,
      late: 0,
    };

    try {
      await addDoc(collection(db, 'events'), data);

      setName('');
      setAction(services[0] || { name: '', price: '' });
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
              <Pressable className="w-full items-center rounded-lg border border-dashed border-border bg-muted/20 px-4 py-4 text-center dark:bg-black/20">
                <Icon as={PlusCircleIcon} size={24} className="text-muted" />
              </Pressable>
            </DialogTrigger>

            <DialogContent>
              <EventDialog
                item={item}
                selectedDay={selectedDay}
                name={name}
                setName={setName}
                action={action}
                setAction={setAction}
                handleSubmit={handleSubmit}
                services={services}
              />
            </DialogContent>
          </Dialog>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default EmptyEvent;
