import { UserProfile } from '@/lib/services/user-service';
import { User } from 'firebase/auth';
import { create } from 'zustand';

export interface AuthState {
  user: User | null;
  userProfile: UserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setUserProfile: (userProfile: UserProfile | null) => void;
  setIsLoading: (loading: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  userProfile: null,
  isLoading: true,
  isAuthenticated: false,
  setUser: (user: User | null) => {
    set({
      user,
      isAuthenticated: !!user,
      isLoading: false,
    });
  },
  setUserProfile: (userProfile: UserProfile | null) => {
    set({ userProfile });
  },
  setIsLoading: (loading: boolean) => set({ isLoading: loading }),
  logout: () =>
    set({
      user: null,
      userProfile: null,
      isAuthenticated: false,
      isLoading: false,
    }),
}));
