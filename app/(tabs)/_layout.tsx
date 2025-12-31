import { Tabs } from 'expo-router';
import React from 'react';

const TabsLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen name="clients" options={{ title: 'Clients', headerShown: false }} />
      <Tabs.Screen name="index" options={{ title: 'Home', headerShown: false }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile', headerShown: false }} />
    </Tabs>
  );
};

export default TabsLayout;
