import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';

import { COLORS } from './assets/styles';

export default function App() {
  const [deviceId, setDeviceId] = useState('');

  useEffect(() => {
    // Check if the device has a id in memory
    // If it hasn't, will create one and send it to the api to create a new user.
    // Sending the device name as well, to identify it in the app.
    setDeviceId('brique');
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
