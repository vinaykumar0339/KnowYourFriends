import { View, Text } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Profile } from '../screens';

const ProfileStack = createNativeStackNavigator();

const ProfileTab = () => {
  return (
    <ProfileStack.Navigator>
        <ProfileStack.Screen 
            name='Profile' 
            component={Profile}
        />
    </ProfileStack.Navigator>
  );
};

export default ProfileTab;
