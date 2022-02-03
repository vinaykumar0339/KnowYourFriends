import { View, Text } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login';
import Register from '../screens/Register';
import { SCREENS } from '../screens';

const AuthStack = createNativeStackNavigator();

const Authentication = () => {
  return (
    <AuthStack.Navigator
        screenOptions={{
            headerShown: false
        }}
    >
        <AuthStack.Screen name={SCREENS.login} component={Login} />
        <AuthStack.Screen name={SCREENS.register} component={Register} />
    </AuthStack.Navigator>
  );
};

export default Authentication;
