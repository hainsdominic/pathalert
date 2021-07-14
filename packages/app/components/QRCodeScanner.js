import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

import { COLORS } from '../assets/styles';
import { addGuardian } from '../assets/requests';

const QRCodeScanner = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = async ({ data }) => {
    setScanned(true);
    const deviceId = await AsyncStorage.getItem('@deviceId');
    await addGuardian(data, deviceId);
    navigation.goBack();
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.explanationContainer}>
        <Text style={styles.explanation}>Scan the Guardian ID (QR Code)</Text>
      </View>
      <View style={styles.scannerContainer}>
        <View style={styles.scanner}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
        <Ionicons name={'arrow-back-outline'} color='gray' size={32} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default QRCodeScanner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanner: {
    backgroundColor: COLORS.white,
    width: 280,
    height: 280,
    alignItems: 'center',
  },
  scannerContainer: {
    backgroundColor: COLORS.white,
    width: 300,
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  explanationContainer: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 15,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  explanation: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  back: {
    marginTop: 60,
  },
});
