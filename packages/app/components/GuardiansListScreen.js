import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

import { COLORS } from '../assets/styles';
import { getGuardians, deleteGuardians } from '../assets/requests';

const Item = ({ title, id, deleteGuardian }) => (
  <View style={styles.guardianContainer}>
    <View style={styles.guardianNameContainer}>
      <Text style={styles.guardian}>{title}</Text>
    </View>

    <TouchableOpacity
      style={styles.closeButton}
      onPress={() => deleteGuardian(id)}
    >
      <Ionicons name={'close-outline'} size={32} />
    </TouchableOpacity>
  </View>
);

const GuardiansListScreen = ({ navigation }) => {
  const [guardians, setGuardians] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      updateGuardians();
    }, [])
  );

  const updateGuardians = async () => {
    const deviceId = await AsyncStorage.getItem('@deviceId');
    const fetchedGuardians = await getGuardians(deviceId);
    setGuardians(fetchedGuardians);
  };

  const deleteGuardian = async (id) => {
    const deviceId = await AsyncStorage.getItem('@deviceId');
    const updatedGuardians = await deleteGuardians(id, deviceId);
    setGuardians(updatedGuardians);
  };

  const renderItem = ({ item }) => (
    <Item
      title={item.deviceName}
      id={item._id}
      deleteGuardian={deleteGuardian}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView>
        <View style={styles.guardianContainer}>
          <Text style={styles.guardians}>Your guardians</Text>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation.navigate('QRCodeScanner')}
          >
            <Ionicons name={'person-add-outline'} color='gray' size={24} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation.navigate('AlertsListScreen')}
          >
            <Ionicons name={'alert-circle-outline'} color='gray' size={26} />
          </TouchableOpacity>
        </View>
        {guardians ? (
          <FlatList
            data={guardians}
            renderItem={renderItem}
            keyExtractor={(guardian) => guardian._id}
          />
        ) : null}
      </SafeAreaView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
  },
  guardians: {
    fontSize: 25,
    fontWeight: 'bold',
    marginVertical: 30,
  },
  guardianNameContainer: {
    marginTop: 20,
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: COLORS.white,
    borderRadius: 15,
    width: 200,
    alignItems: 'center',
  },
  guardian: {
    fontSize: 16,
  },
  closeButton: {
    marginTop: 20,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  guardianContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconButton: {
    marginLeft: 20,
  },
});

export default GuardiansListScreen;
