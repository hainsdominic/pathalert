import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import MainScreen from './components/MainScreen';
import QRCodeScanner from './components/QRCodeScanner.js';

const RootStack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator mode='modal'>
        <RootStack.Screen
          name='Main'
          component={MainScreen}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name='QRCodeScanner'
          component={QRCodeScanner}
          options={{ headerShown: false }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
