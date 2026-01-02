import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
  UserCredential,
} from 'firebase/auth';
import { auth } from '../firebase';
import { userService } from './user-service';

export interface AuthCredentials {
  email: string;
  password: string;
  displayName?: string;
}

export interface AuthService {
  signUp: (credentials: AuthCredentials) => Promise<UserCredential>;
  signIn: (email: string, password: string) => Promise<UserCredential>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserProfile: (user: User, data: { displayName?: string }) => Promise<void>;
}

export const authService: AuthService = {
  signUp: async ({ email, password, displayName }: AuthCredentials) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    if (displayName && userCredential.user) {
      await updateProfile(userCredential.user, { displayName });
    }

    await userService.createUser(userCredential.user);

    return userCredential;
  },

  signIn: async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    const existingUser = await userService.getUser(userCredential.user.uid);
    if (!existingUser) {
      await userService.createUser(userCredential.user);
    }

    return userCredential;
  },

  signOut: async () => {
    return await signOut(auth);
  },

  resetPassword: async (email: string) => {
    return await sendPasswordResetEmail(auth, email);
  },

  updateUserProfile: async (user: User, data: { displayName?: string }) => {
    return await updateProfile(user, data);
  },
};
