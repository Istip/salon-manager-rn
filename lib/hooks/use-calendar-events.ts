import { isSameDay } from '@/lib/date-functions';
import { db } from '@/lib/firebase';
import { useAuthStore } from '@/lib/stores/auth-store';
import { useDateStore } from '@/lib/stores/date-store';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export interface CalendarEvent {
  id: string;
  name: string;
  action: string;
  time: string;
  done: boolean;
  price: number;
  late: number;
  date: Date;
  uid: string;
  createdAt: Date;
}

export const useCalendarEvents = () => {
  const [events, setEvents] = useState<Record<string, CalendarEvent>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const user = useAuthStore((state) => state.user);
  const selectedDay = useDateStore((state) => state.selectedDay);

  useEffect(() => {
    if (!user?.uid) {
      setEvents({});
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const q = query(collection(db, 'events'), where('uid', '==', user.uid));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const eventsMap: Record<string, CalendarEvent> = {};
        snapshot.forEach((doc) => {
          const data = doc.data();
          const eventDate = new Date(data.date.toDate());

          if (isSameDay(eventDate, selectedDay)) {
            eventsMap[data.time] = {
              id: doc.id,
              name: data.name,
              action: data.action,
              time: data.time,
              done: data.done,
              price: data.price,
              late: data.late,
              date: eventDate,
              uid: data.uid,
              createdAt: new Date(data.createdAt.toDate()),
            };
          }
        });
        setEvents(eventsMap);
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching events:', error);
        setError(error.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user?.uid, selectedDay.getTime()]);

  return { events, loading, error };
};
