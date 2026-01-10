import { User } from 'firebase/auth';
import {
  arrayUnion,
  doc,
  FieldValue,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../firebase';

export interface UserSettings {
  theme: 'light' | 'dark';
  defaultGender: 'male' | 'female';
}

export interface Service {
  name: string;
  price: string;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  phoneNumber?: string;
  role: string;
  settings: UserSettings;
  services: Service[];
  createdAt: FieldValue | Date;
  updatedAt: FieldValue | Date;
}

export interface UserService {
  createUser: (user: User) => Promise<UserProfile>;
  getUser: (uid: string) => Promise<UserProfile | null>;
  updateUser: (uid: string, data: Partial<UserProfile>) => Promise<void>;
  updateTheme: (uid: string, theme: 'light' | 'dark') => Promise<void>;
  updateDefaultGender: (uid: string, gender: 'male' | 'female') => Promise<void>;
  addNewService: (uid: string, service: Service) => Promise<void>;
  removeService: (uid: string, serviceName: string) => Promise<void>;
  updateServicePrice: (uid: string, serviceName: string, newPrice: string) => Promise<void>;
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
      services: [
        { name: 'adult hair cut', price: '50' },
        { name: 'child hair cut', price: '40' },
        { name: 'shaving', price: '35' },
      ],
      role: 'user',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    await setDoc(userRef, userProfileData);

    return {
      uid: user.uid,
      email: user.email || '',
      displayName: user.displayName || providerData?.displayName || '',
      photoURL: user.photoURL || providerData?.photoURL || '',
      phoneNumber: user.phoneNumber || providerData?.phoneNumber || '',
      role: 'user',
      settings: {
        theme: 'light',
        defaultGender: 'female',
      },
      services: [
        { name: 'adult hair cut', price: '50' },
        { name: 'child hair cut', price: '40' },
        { name: 'shaving', price: '35' },
      ],
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

  addNewService: async (uid: string, service: Service): Promise<void> => {
    try {
      const userRef = doc(db, 'users', uid);
      await updateDoc(userRef, {
        services: arrayUnion(service),
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error adding new service:', error);
      throw error;
    }
  },

  removeService: async (uid: string, serviceName: string): Promise<void> => {
    try {
      const user = await userService.getUser(uid);
      if (!user) {
        throw new Error('User not found');
      }

      const updatedServices = user.services.filter((service) => service.name !== serviceName);

      const userRef = doc(db, 'users', uid);
      await updateDoc(userRef, {
        services: updatedServices,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error removing service:', error);
      throw error;
    }
  },

  updateServicePrice: async (uid: string, serviceName: string, newPrice: string): Promise<void> => {
    try {
      const user = await userService.getUser(uid);
      if (!user) {
        throw new Error('User not found');
      }

      const updatedServices = user.services.map((service) =>
        service.name === serviceName ? { ...service, price: newPrice } : service
      );

      const userRef = doc(db, 'users', uid);
      await updateDoc(userRef, {
        services: updatedServices,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error updating service price:', error);
      throw error;
    }
  },
};
