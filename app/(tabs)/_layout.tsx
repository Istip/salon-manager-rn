import { Icon } from '@/components/ui/icon';
import { colors } from '@/lib/colors';
import { Tabs } from 'expo-router';
import { Clock, Settings, UsersRound } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const TabsLayout = () => {
  const { bottom } = useSafeAreaInsets();

  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        animation: 'shift',
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 80 + bottom,
          borderTopWidth: 0,
          paddingBottom: bottom,
        },
        tabBarIconStyle: {
          marginVertical: 'auto',
        },
        tabBarActiveBackgroundColor: colors.primary,
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
              size={25}
              className={focused ? 'text-foreground' : 'text-muted-foreground'}
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
              size={25}
              className={focused ? 'text-foreground' : 'text-muted-foreground'}
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
              size={25}
              className={focused ? 'text-foreground' : 'text-muted-foreground'}
            />
          ),
        }}
      />
    </Tabs>
  );
};
export default TabsLayout;
