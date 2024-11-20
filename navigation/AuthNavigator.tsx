import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

// Import your screens
import Onboarding from '../app/onboarding';
import Login from '../app/login';
import Register from '../app/register';
import Dashboard from '../app/dashboard';
import Profile from '../app/profile';
import NewPill from '../app/newPill';
import UserSettings from '../app/userSettings';
import NotificationsSettings from '../app/notificationsSettings';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Onboarding" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="NewPill" component={NewPill} />
        <Stack.Screen name="UserSettings" component={UserSettings} />
        <Stack.Screen name="NotificationsSettings" component={NotificationsSettings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthNavigator;
