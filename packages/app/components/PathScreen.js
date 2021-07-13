import React from 'react';
import { StyleSheet, Text, TouchableOpacity, SafeAreaView } from 'react-native';

import { COLORS } from '../assets/styles';

const PathScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => console.log('path')}
        style={styles.button}
      >
        <Text style={styles.buttonText}> Path Screen </Text>
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

export default PathScreen;
