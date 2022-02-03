import { View, Text } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home, SCREENS } from '../screens';

const HomeStack = createNativeStackNavigator();

const HomeTab = () => {
  return (
    <HomeStack.Navigator>
        <HomeStack.Screen 
            name={SCREENS.home} 
            component={Home}
        />
    </HomeStack.Navigator>
  );
};

export default HomeTab;
