import React, { useEffect } from 'react';
import { StatusBar, Alert } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Device from 'expo-device';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';

import GuardiansListScreen from './GuardiansListScreen';
import PathScreen from './PathScreen';
import MeScreen from './MeScreen';
import { getId, saveNotificationsToken } from '../assets/requests';

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

const MainScreen = () => {
  // Make the status bar visible
  StatusBar.setBarStyle('dark-content', true);

  useEffect(() => {
    // Gets the Device ID
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

      // Gets the push notifications token
      // https://docs.expo.dev/push-notifications/push-notifications-setup/
      try {
        if (Constants.isDevice) {
          const storedDeviceId = await AsyncStorage.getItem('@deviceId');
          const { status: existingStatus } =
            await Notifications.getPermissionsAsync();
          let finalStatus = existingStatus;
          if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
          }
          if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
          }
          const token = (await Notifications.getExpoPushTokenAsync()).data;
          await saveNotificationsToken(token, storedDeviceId);
        } else {
          alert('Must use physical device for Push Notifications');
        }

        if (Platform.OS === 'android') {
          Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
          });
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

export default MainScreen;
