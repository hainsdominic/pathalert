import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';
import moment from 'moment-timezone';

import { COLORS } from '../assets/styles';
import { getAlerts } from '../assets/requests';

const Item = ({ alert: { device, date, safe, lat, lon } }) => (
  <TouchableOpacity
    style={[
      styles.alertContainer,
      { backgroundColor: safe ? COLORS.lightGreen : COLORS.lightRed },
    ]}
    onPress={() =>
      Linking.openURL(`http://www.google.com/maps/place/${lat},${lon}`)
    }
  >
    <View style={styles.alertDateContainer}>
      <Text style={styles.alertDate}>
        {moment(date).tz(Localization.timezone).format('YYYY-MM-DD HH:mm')}
      </Text>
    </View>
    <View style={styles.alertTextContainer}>
      <Text style={styles.alertText}>
        {device.deviceName} is {safe ? 'safe' : 'not safe'} !
      </Text>
    </View>
  </TouchableOpacity>
);

const AlertsListScreen = ({ navigation }) => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    (async () => {
      const deviceId = await AsyncStorage.getItem('@deviceId');
      const alerts = await getAlerts(deviceId);
      setAlerts(alerts);
    })();
  }, []);

  const renderItem = ({ item }) => <Item alert={item} />;

  return (
    <SafeAreaView style={styles.container}>
      {
        alerts !== undefined ? (
          alerts.length > 0 ? (
            <FlatList
              data={alerts.reverse()}
              renderItem={renderItem}
              keyExtractor={(alert) => alert._id}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            />
          ) : (
            <View>
              <Text>No alerts yet</Text>
            </View>
          )
        ) : null //spinner
      }
      <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
        <Ionicons name={'arrow-back-outline'} color='gray' size={32} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AlertsListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  back: {
    marginBottom: 20,
    marginTop: 5,
  },
  alertContainer: {
    marginTop: 25,
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 15,
    width: 300,
    alignItems: 'center',
  },
  alertDateContainer: {},
  alertDate: {},
  alertTextContainer: { marginTop: 5 },
  alertText: {
    fontWeight: 'bold',
  },
});
