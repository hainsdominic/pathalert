import React, { useEffect } from 'react';
import { StatusBar, Alert } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Device from 'expo-device';

import GuardiansListScreen from './GuardiansListScreen';
import PathScreen from './PathScreen';
import MeScreen from './MeScreen';
import { getId } from '../assets/requests';

const Tab = createBottomTabNavigator();

const screenOptions = (route, color) => {
  let iconName;

  switch (route.name) {
    case 'Path':
      iconName = 'walk-outline';
      break;
    case 'GuardiansList':
      iconName = 'shield-outline';
      break;
    case 'Me':
      iconName = 'person-circle-outline';
      break;
    default:
      break;
  }

  return <Ionicons name={iconName} color={color} size={24} />;
};

const App = () => {
  // Make the status bar visible
  StatusBar.setBarStyle('dark-content', true);

  useEffect(() => {
    (async () => {
      // Check if the device has a id in memory
      try {
        const storedDeviceId = await AsyncStorage.getItem('@deviceId');

        if (storedDeviceId == null) {
          // If it hasn't, will create one and send it to the api to create a new user.
          // Sending the device name as well, to identify it in the app.
          const deviceName = Device.deviceName;

          // Get a new id from the API
          const id = await getId(deviceName);

          // Store the id in storage
          await AsyncStorage.setItem('@deviceId', id);
        }
      } catch (error) {
        console.log(error);
        Alert.alert('An error occured.', 'Are you connected to internet?');
      }
    })();
  }, []);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => screenOptions(route, color),
      })}
      tabBarOptions={{
        showLabel: false,
      }}
    >
      <Tab.Screen name='Path' component={PathScreen} />
      <Tab.Screen name='GuardiansList' component={GuardiansListScreen} />
      <Tab.Screen name='Me' component={MeScreen} />
    </Tab.Navigator>
  );
};

export default App;