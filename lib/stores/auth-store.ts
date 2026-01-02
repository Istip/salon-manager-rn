import { User } from 'firebase/auth';
import { create } from 'zustand';

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setIsLoading: (loading: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  setUser: (user: User | null) => {
    set({
      user,
      isAuthenticated: !!user,
      isLoading: false,
    });
  },
  setIsLoading: (loading: boolean) => set({ isLoading: loading }),
  logout: () =>
    set({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    }),
}));
