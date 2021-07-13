import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import QRCode from 'react-native-qrcode-svg';
import * as Device from 'expo-device';

import { COLORS } from './assets/styles';
import { getId } from './assets/requests';

export default function App() {
  const [deviceId, setDeviceId] = useState('');

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

          console.log(id);

          // Store the id in storage
          await AsyncStorage.setItem('@deviceId', id);
          setDeviceId(id);
        } else {
          setDeviceId(storedDeviceId);
        }
      } catch (error) {
        console.log(error);
        Alert.alert('An error occured.', 'Are you connected to internet?');
      }
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => console.log('new path')}
        style={styles.button}
      >
        <Text style={styles.buttonText}> Start a new path </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => console.log('guardians')}
        style={styles.button}
      >
        <Text style={styles.buttonText}> My Guardians </Text>
      </TouchableOpacity>
      <SafeAreaView style={styles.guardianIdContainer}>
        <Text style={styles.guardianIdText}> Your guardian ID </Text>
        {deviceId ? <QRCode value={deviceId} /> : null}
      </SafeAreaView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: COLORS.white,
    borderRadius: 15,
    width: 290,
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText: {
    fontSize: 14,
  },
  guardianIdContainer: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: COLORS.white,
    borderRadius: 15,
    width: 200,
    height: 200,
    alignItems: 'center',
    marginTop: 35,
  },
  guardianIdText: {
    marginVertical: 15,
    fontSize: 16,
  },
});
