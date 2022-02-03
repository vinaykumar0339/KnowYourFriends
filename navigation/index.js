import { View, Text } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabs from './bottomTabs';
import HomeTab from './bottomTabs/HomeTab';

const Navigation = () => {
  return (
    <NavigationContainer>
        <BottomTabs />
    </NavigationContainer>
  );
};

export default Navigation;
