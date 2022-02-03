import { View, Text } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeTab from './HomeTab';
import ProfileTab from './ProfileTab';
import { COLORS, CustomIcons } from '../../resources'

const Tabs = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tabs.Navigator
        screenOptions={{
            tabBarActiveTintColor: COLORS.primary,
            tabBarInactiveTintColor: COLORS.secondary,
        }}
    >
        <Tabs.Screen 
            name='HomeTab' 
            component={HomeTab} 
            options={{
                headerShown: false,
                tabBarLabel: 'Home',
                tabBarIcon: ({ color, size }) => {
                    return <CustomIcons name='home' color={color} size={size} />
                }
            }}
        />
        <Tabs.Screen 
            name='ProfileTab' 
            component={ProfileTab} 
            options={{
                headerShown: false,
                tabBarLabel: 'Profile',
                tabBarIcon: ({ color, size }) => {
                    return <CustomIcons name='user' color={color} size={size} />
                }
            }}
        />
    </Tabs.Navigator>
  );
};

export default BottomTabs;
