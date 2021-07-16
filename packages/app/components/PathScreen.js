import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, Alert } from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import { useFocusEffect } from '@react-navigation/native';

import { COLORS } from '../assets/styles';

const PathScreen = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [permRequested, setPermRequested] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      if (!permRequested) {
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      }

      setPermRequested(true);
    })();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        if (permRequested) {
          let location = await Location.getCurrentPositionAsync({});
          setLocation(location);
        }
      })();
    }, [])
  );

  return (
    <View style={styles.container}>
      {!errorMsg ? (
        location ? (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 1,
              longitudeDelta: 1,
            }}
          />
        ) : null
      ) : (
        <Text>{errorMsg}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default PathScreen;
