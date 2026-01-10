import { User } from 'firebase/auth';
import { doc, FieldValue, getDoc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

export interface UserSettings {
  theme: 'light' | 'dark';
  defaultGender: 'male' | 'female';
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  phoneNumber?: string;
  settings: UserSettings;
  createdAt: FieldValue | Date;
  updatedAt: FieldValue | Date;
}

export interface UserService {
  createUser: (user: User) => Promise<UserProfile>;
  getUser: (uid: string) => Promise<UserProfile | null>;
  updateUser: (uid: string, data: Partial<UserProfile>) => Promise<void>;
  updateTheme: (uid: string, theme: 'light' | 'dark') => Promise<void>;
  updateDefaultGender: (uid: string, gender: 'male' | 'female') => Promise<void>;
}

export const userService: UserService = {
  createUser: async (user: User): Promise<UserProfile> => {
    const userRef = doc(db, 'users', user.uid);

    const providerData = user.providerData[0];

    const userProfileData: UserProfile = {
      uid: user.uid,
      email: user.email || '',
      displayName: user.displayName || providerData?.displayName || '',
      photoURL: user.photoURL || providerData?.photoURL || '',
      phoneNumber: user.phoneNumber || providerData?.phoneNumber || '',
      settings: {
        theme: 'light',
        defaultGender: 'female',
      },
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    await setDoc(userRef, userProfileData);

    return {
      uid: user.uid,
      email: user.email || '',
      settings: {
        theme: 'light',
        defaultGender: 'female',
      },
      displayName: user.displayName || providerData?.displayName || '',
      photoURL: user.photoURL || providerData?.photoURL || '',
      phoneNumber: user.phoneNumber || providerData?.phoneNumber || '',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  },

  getUser: async (uid: string): Promise<UserProfile | null> => {
    try {
      const userRef = doc(db, 'users', uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        return userSnap.data() as UserProfile;
      }

      return null;
    } catch (error) {
      console.error('Error getting user:', error);
      return null;
    }
  },

  updateUser: async (uid: string, data: Partial<UserProfile>): Promise<void> => {
    try {
      const userRef = doc(db, 'users', uid);

      const updateData: any = {
        updatedAt: serverTimestamp(),
      };

      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined) {
          updateData[key] = value;
        }
      });

      await updateDoc(userRef, updateData);
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  },

  updateTheme: async (uid: string, theme: 'light' | 'dark'): Promise<void> => {
    try {
      const userRef = doc(db, 'users', uid);
      await updateDoc(userRef, {
        'settings.theme': theme,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error updating theme:', error);
      throw error;
    }
  },

  updateDefaultGender: async (uid: string, gender: 'male' | 'female') => {
    try {
      const userRef = doc(db, 'users', uid);
      await updateDoc(userRef, {
        'settings.defaultGender': gender,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error updating default gender', error);
      throw error;
    }
  },
};
