import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, SafeAreaView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import QRCode from 'react-native-qrcode-svg';
import * as Device from 'expo-device';

import { COLORS } from '../assets/styles';
import { getId } from '../assets/requests';

const MeScreen = ({ navigation }) => {
  const [deviceId, setDeviceId] = useState('');

  useEffect(() => {
    (async () => {
      // Check if the device has a id in memory
      try {
        const storedDeviceId = await AsyncStorage.getItem('@deviceId');

        setDeviceId(storedDeviceId);
      } catch (error) {
        console.log(error);
        Alert.alert('An error occured.', 'Are you connected to internet?');
      }
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.deviceNameContainer}>
        <Text style={styles.deviceName}>Name: {Device.deviceName}</Text>
      </SafeAreaView>

      <SafeAreaView style={styles.guardianIdContainer}>
        <Text style={styles.guardianIdText}> Your guardian ID </Text>
        {deviceId ? <QRCode size={200} value={deviceId} /> : null}
      </SafeAreaView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  guardianIdContainer: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: COLORS.white,
    borderRadius: 15,
    width: 300,
    height: 300,
    alignItems: 'center',
    marginTop: 35,
  },
  guardianIdText: {
    marginVertical: 15,
    fontSize: 16,
    fontWeight: 'bold',
  },
  deviceNameContainer: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: COLORS.white,
    borderRadius: 15,
    width: 300,
    alignItems: 'center',
    marginTop: 15,
  },
  deviceName: {
    fontSize: 16,
  },
});

export default MeScreen;
