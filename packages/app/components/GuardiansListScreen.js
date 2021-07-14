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
      <Ionicons name={'close-outline'} size={20} />
    </TouchableOpacity>
  </View>
);

const GuardiansListScreen = () => {
  const [guardians, setGuardians] = useState([]);

  useEffect(() => {
    (async () => {
      const deviceId = await AsyncStorage.getItem('@deviceId');
      const fetchedGuardians = await getGuardians(deviceId);
      setGuardians(fetchedGuardians);
    })();
  }, []);

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
      {guardians ? (
        <SafeAreaView>
          <View style={styles.guardianContainer}>
            <Text style={styles.guardians}>Your guardians</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => console.log('add')}
            >
              <Ionicons name={'person-add-outline'} color='gray' size={24} />
            </TouchableOpacity>
          </View>

          <FlatList
            data={guardians}
            renderItem={renderItem}
            keyExtractor={(guardian) => guardian._id}
          />
        </SafeAreaView>
      ) : null}
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
    paddingVertical: 5,
    paddingHorizontal: 5,
    backgroundColor: COLORS.white,
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.lightRed,
  },
  guardianContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    marginLeft: 15,
  },
});

export default GuardiansListScreen;
