import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';

import { COLORS } from '../assets/styles';

const GuardiansListScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => console.log('guardian list')}
        style={styles.button}
      >
        <Text style={styles.buttonText}> Guardian </Text>
      </TouchableOpacity>
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
});

export default GuardiansListScreen;
