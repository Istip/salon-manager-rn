import Loading from '@/components/utils/loading';
import { useAuthStore } from '@/lib/stores/auth-store';
import { Redirect } from 'expo-router';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return <Redirect href="/auth/sign-in" />;
  }

  return <>{children}</>;
}
