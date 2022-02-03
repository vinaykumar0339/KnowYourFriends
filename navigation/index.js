import { View, Text } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabs from './bottomTabs';
import Authentication from './auth';

const Navigation = ({ loggedInUser }) => {
  return (
    <NavigationContainer>
        { loggedInUser ? <BottomTabs /> : <Authentication /> }
    </NavigationContainer>
  );
};

export default Navigation;
