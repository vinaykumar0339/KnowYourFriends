import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeTab from './HomeTab';
import ProfileTab from './ProfileTab';
import { COLORS, CustomIcons } from '../../resources'
import { TABS } from '../screens';
import ReactNativeForegroundService from "@supersami/rn-foreground-service";

const Tabs = createBottomTabNavigator();

const BottomTabs = () => {

    useEffect(() => {

        if (!ReactNativeForegroundService.is_task_running('locationUpdate')) {
            ReactNativeForegroundService.add_task(() => {
                console.log("i am being tested...")
            }, {
                taskId: 'locationUpdate',
                onSuccess: () => {
                    console.log("on success")
                }, 
                onError: () => {
                    console.log('on error')
                }
            })

            ReactNativeForegroundService.start({
                id: 144,
                title: "App running in background.",
                message: "It help's you to get updates from ur friends.",
            });
        }

    }, [])

    return (
        <Tabs.Navigator
            screenOptions={{
                tabBarActiveTintColor: COLORS.primary,
                tabBarInactiveTintColor: COLORS.secondary,
            }}
        >
            <Tabs.Screen 
                name={TABS.homeTab} 
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
                name={TABS.profileTab}
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
