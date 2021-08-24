import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import timer from 'react-native-timer';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { COLORS } from '../assets/styles';

import { sendAlert } from '../assets/requests';

const PathScreen = () => {
  const [errorMsg, setErrorMsg] = useState(null);
  const [permRequested, setPermRequested] = useState(false);

  const [danger, setDanger] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      setPermRequested(true);
    })();
  }, []);

  const handleNotification = async () => {
    setDanger(!danger);
    if (!danger) {
      sendNotification(false);
      timer.setInterval('timer', () => sendNotification(false), 60000);
    } else {
      sendNotification(true);
      timer.clearInterval('timer');
    }
  };

  const sendNotification = async (safe) => {
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({});
    const storedDeviceId = await AsyncStorage.getItem('@deviceId');

    sendAlert(storedDeviceId, latitude, longitude, safe);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={[
          styles.panicButton,
          { backgroundColor: danger ? COLORS.lightGreen : COLORS.lightRed },
        ]}
        onPress={() => {
          handleNotification();
        }}
      >
        <Text style={styles.panicButtonText}>
          {danger ? 'I am safe' : "I don't feel safe"}
        </Text>
      </TouchableOpacity>
      <Text style={styles.explanationText}>
        By pressing the button above, you will send your position to your
        guardians every minute. To stop, confirm that you are safe.
      </Text>
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
  panicButton: {
    borderRadius: 25,
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 220,
  },
  panicButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  explanationText: {
    fontSize: 16,
    marginTop: 'auto',
    marginBottom: 40,
    color: COLORS.gray,
    marginHorizontal: 15,
  },
});

export default PathScreen;
