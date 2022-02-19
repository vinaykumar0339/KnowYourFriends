import { View, Text } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Profile, SCREENS } from '../screens';

const ProfileStack = createNativeStackNavigator();

const ProfileTab = () => {
  return (
    <ProfileStack.Navigator>
        <ProfileStack.Screen
            options={{
              headerShown: false
            }} 
            name={SCREENS.profile} 
            component={Profile}
        />
    </ProfileStack.Navigator>
  );
};

export default ProfileTab;
