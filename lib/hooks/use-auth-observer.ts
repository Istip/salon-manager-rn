import { auth } from '@/lib/firebase';
import { userService } from '@/lib/services/user-service';
import { useAuthStore } from '@/lib/stores/auth-store';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';

export const useAuthStateObserver = () => {
  const { setUser, setIsLoading } = useAuthStore();

  useEffect(() => {
    setIsLoading(true);

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const existingUser = await userService.getUser(user.uid);
          if (!existingUser) {
            await userService.createUser(user);
          }
        } catch (error: any) {
          console.error('Error handling user in Firestore:', error);
        }
      }

      setUser(user);
      setIsLoading(false);
    });

    return unsubscribe;
  }, [setUser, setIsLoading]);
};
