import ProtectedRoute from '@/components/protected-route';
import { Icon } from '@/components/ui/icon';
import { Tabs } from 'expo-router';
import { Clock, Settings, UsersRound } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const TabsLayout = () => {
  const { bottom } = useSafeAreaInsets();

  return (
    <ProtectedRoute>
      <Tabs
        initialRouteName="index"
        screenOptions={{
          animation: 'shift',
          tabBarShowLabel: false,
          tabBarStyle: {
            height: 60 + bottom,
            borderTopWidth: 0,
            paddingBottom: bottom,
          },
          tabBarIconStyle: {
            marginVertical: 'auto',
          },
        }}>
        <Tabs.Screen
          name="clients"
          options={{
            title: 'Clients',
            headerShown: false,
            animation: 'shift',
            tabBarIcon: ({ focused }) => (
              <Icon
                as={UsersRound}
                size={24}
                className={focused ? 'text-primary' : 'text-muted-foreground'}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            headerShown: false,
            animation: 'shift',
            tabBarIcon: ({ focused }) => (
              <Icon
                as={Clock}
                size={24}
                className={focused ? 'text-primary' : 'text-muted-foreground'}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            headerShown: false,
            animation: 'shift',
            tabBarIcon: ({ focused }) => (
              <Icon
                as={Settings}
                size={24}
                className={focused ? 'text-primary' : 'text-muted-foreground'}
              />
            ),
          }}
        />
      </Tabs>
    </ProtectedRoute>
  );
};
export default TabsLayout;
